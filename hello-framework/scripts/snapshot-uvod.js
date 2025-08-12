// hello-framework/scripts/snapshot-uvod.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const START_URL   = process.env.START_URL   || "https://hjftm.github.io/uvod/";
const OUT_DIR     = process.env.OUT_DIR     || path.resolve(__dirname, "..", "snapshot-uvod");
const MAX_PAGES   = Number(process.env.MAX_PAGES || 1200);
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const WAIT_MS     = Number(process.env.WAIT_MS || 1500);
const NAV_TIMEOUT = Number(process.env.NAV_TIMEOUT || 60000);

const start = new URL(START_URL);
const ORIGIN = start.origin;                                // https://hjftm.github.io
const PATH_PREFIX = start.pathname.replace(/\/+$/, "") || "/uvod"; // /uvod

function isInternalAllowed(urlStr) {
  try {
    const u = new URL(urlStr, ORIGIN);
    return u.origin === ORIGIN && u.pathname.startsWith(PATH_PREFIX);
  } catch {
    return false;
  }
}

function sanitizeHash(hash) {
  // "#/pages/abc?x=1" -> "__h-pages-abc-x-1"
  if (!hash) return "";
  const clean = hash.replace(/^#\/?/, ""); // skini leading # i opcionalni /
  const safe = clean.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return safe ? `__h-${safe}` : "";
}

function toLocalPath(u) {
  const url = new URL(u);
  let p = url.pathname;
  const isDir = p.endsWith("/");
  if (isDir) p = p.replace(/\/+$/, "");
  const hasExt = path.extname(p);

  const baseDir = path.join(OUT_DIR, p);
  const baseFile = (isDir || !hasExt) ? path.join(baseDir, "index.html") : path.join(OUT_DIR, p);

  // Ako URL ima hash rutu, mapiraj na zasebnu datoteku uz suffix
  const h = sanitizeHash(url.hash);
  if (h) {
    const dir = path.dirname(baseFile);
    const name = path.basename(baseFile, ".html");
    return path.join(dir, `${name}-${h}.html`);
  }
  return baseFile;
}

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function normalizeUrlAbs(u, base = ORIGIN) {
  try {
    return new URL(u, base).toString();
  } catch {
    return null;
  }
}

async function snapshotPage(browser, pageUrl) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(NAV_TIMEOUT);
  page.setDefaultTimeout(NAV_TIMEOUT);

  await page.goto(pageUrl, { waitUntil: "networkidle2" });
  if (WAIT_MS > 0) await delay(WAIT_MS);

  // 1) Prikupi sve linkove (i hash rute) PRIJE uklanjanja <script>
  const { linkUrls, hashUrls } = await page.evaluate((origin, prefix) => {
    const outLinks = new Set();
    const outHashes = new Set();

    // A) standardni <a href=...>
    document.querySelectorAll("a[href]").forEach(a => {
      const raw = a.getAttribute("href");
      if (!raw) return;
      try {
        // hash-only link?
        if (raw.startsWith("#")) {
          // Hash rute tretiramo kao zasebne podstranice
          const u = new URL(location.href);
          u.hash = raw;
          outHashes.add(u.toString());
          return;
        }
        const u = new URL(raw, origin);
        if (!["http:", "https:"].includes(u.protocol)) return;
        if (u.origin === origin && u.pathname.startsWith(prefix)) {
          outLinks.add(u.toString());
          // Ako cilj ima hash dio, tretiraj i to
          if (u.hash) outHashes.add(u.toString());
        }
      } catch {}
    });

    // B) Elementi s data-href ili role=link (nekad menu radi preko JS)
    document.querySelectorAll("[data-href]").forEach(el => {
      const raw = el.getAttribute("data-href");
      try {
        if (raw?.startsWith("#")) {
          const u = new URL(location.href);
          u.hash = raw;
          outHashes.add(u.toString());
        } else {
          const u = new URL(raw, origin);
          if (u.origin === origin && u.pathname.startsWith(prefix)) {
            outLinks.add(u.toString());
            if (u.hash) outHashes.add(u.toString());
          }
        }
      } catch {}
    });

    return { linkUrls: Array.from(outLinks), hashUrls: Array.from(outHashes) };
  }, ORIGIN, PATH_PREFIX);

  // 2) Ukloni skripte i preload/prefetch (snapshot bez JS)
  await page.evaluate(() => {
    for (const s of Array.from(document.querySelectorAll("script"))) s.remove();
    for (const l of Array.from(document.querySelectorAll('link[rel="preload"], link[rel="modulepreload"], link[rel="prefetch"]'))) l.remove();
  });

  // 3) Rewrite lokalnih linkova (uključujući hash rute) u relativne datoteke
  await page.evaluate((origin, prefix) => {
    function sanitizeHash(hash) {
      if (!hash) return "";
      const clean = hash.replace(/^#\/?/, "");
      const safe = clean.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      return safe ? `__h-${safe}` : "";
    }

    function targetPath(u) {
      // vrati putanju (unutar URL patha) do lokalne datoteke
      const url = new URL(u, origin);
      let p = url.pathname;
      const isDir = p.endsWith("/");
      if (isDir) p = p.replace(/\/+$/, "");
      const hasExt = /\.[a-z0-9]+$/i.test(p);
      let filePath = hasExt ? p : `${p}/index.html`;
      const h = sanitizeHash(url.hash);
      if (h) {
        // npr /uvod/page/index__h-abc.html
        const idx = filePath.endsWith("index.html");
        if (idx) {
          filePath = filePath.replace(/index\.html$/, `index-${h}.html`);
        } else {
          const m = filePath.match(/^(.*)\.html$/);
          if (m) filePath = `${m[1]}-${h}.html`;
          else filePath = `${filePath}-${h}.html`;
        }
      }
      return filePath;
    }

    function makeRel(from, to) {
      const fromParts = from.split("/").filter(Boolean);
      const toParts = to.split("/").filter(Boolean);
      while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
        fromParts.shift(); toParts.shift();
      }
      const up = Array(fromParts.length - 1).fill(".."); // -1 jer from je datoteka
      return [...up, ...toParts].join("/") || "index.html";
    }

    const fromPath = (location.pathname.endsWith("/") ? location.pathname + "index.html" : location.pathname);

    // A) <a href>
    document.querySelectorAll("a[href]").forEach(a => {
      const raw = a.getAttribute("href");
      if (!raw) return;
      try {
        let u;
        if (raw.startsWith("#")) {
          u = new URL(location.href);
          u.hash = raw;
        } else {
          u = new URL(raw, origin);
        }
        if (u.origin === origin && u.pathname.startsWith(prefix)) {
          const tp = targetPath(u);
          const rel = makeRel(fromPath, tp);
          a.setAttribute("href", rel);
        }
      } catch {}
    });

    // B) data-href -> pretvori u <a> semantiku ako je unutarnje
    document.querySelectorAll("[data-href]").forEach(el => {
      const raw = el.getAttribute("data-href");
      if (!raw) return;
      try {
        let u;
        if (raw.startsWith("#")) {
          u = new URL(location.href);
          u.hash = raw;
        } else {
          u = new URL(raw, origin);
        }
        if (u.origin === origin && u.pathname.startsWith(prefix)) {
          const tp = targetPath(u);
          const rel = makeRel(fromPath, tp);
          el.setAttribute("data-href", rel);
          // ako element nije <a>, pokušaj mu postaviti href za pristupačnost
          if (!el.getAttribute("href")) el.setAttribute("href", rel);
        }
      } catch {}
    });
  }, ORIGIN, PATH_PREFIX);

  const html = await page.content();
  await page.close();

  // Spoji klasične linkove i hash-rute (kao apsolutne URL-ove)
  const nextUrls = new Set();
  for (const u of [...linkUrls, ...hashUrls]) {
    const abs = normalizeUrlAbs(u);
    if (abs) nextUrls.add(abs);
  }

  return { html, nextUrls: Array.from(nextUrls) };
}

async function run() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const queue = [START_URL];
    const seen = new Set(queue);
    const saved = new Set();

    async function worker() {
      while (queue.length) {
        const url = queue.shift();
        if (!url) break;
        if (!isInternalAllowed(url)) continue;

        const outFile = toLocalPath(url);
        if (saved.has(outFile)) continue;

        console.log("▶ Snapshot:", url);
        try {
          const { html, nextUrls } = await snapshotPage(browser, url);
          ensureDirFor(outFile);
          fs.writeFileSync(outFile, html, "utf8");
          saved.add(outFile);

          for (const uu of nextUrls) {
            if (seen.size >= MAX_PAGES) break;
            if (isInternalAllowed(uu) && !seen.has(uu)) {
              seen.add(uu);
              queue.push(uu);
            }
          }
        } catch (e) {
          console.error("✖ Error on", url, e && e.message ? e.message : e);
        }
      }
    }

    const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker());
    await Promise.all(workers);

    // sigurnosno: osiguraj da postoji i početni index
    const startIndex = toLocalPath(START_URL);
    if (!fs.existsSync(startIndex)) {
      ensureDirFor(startIndex);
      fs.writeFileSync(startIndex, "<!doctype html><meta charset='utf-8'><title>uvod</title><p>Prazno.</p>", "utf8");
    }

    console.log(`Done. Saved into: ${OUT_DIR}`);
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
