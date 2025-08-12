// hello-framework/scripts/snapshot-uvod.js
// Snapshotira sve renderirane stranice ispod /uvod/ na istoj domeni (hjftm.github.io)
// i sprema ih kao static HTML bez <script> tagova. Interne linkove preusmjerava
// na lokalne .html datoteke (ili /index.html po folderu).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Konfiguracija preko ENV varijabli (ili default) ---
const START_URL   = process.env.START_URL   || "https://hjftm.github.io/uvod/";
const OUT_DIR     = process.env.OUT_DIR     || path.resolve(__dirname, "..", "snapshot-uvod");
const MAX_PAGES   = Number(process.env.MAX_PAGES || 500);      // sigurnosna granica
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);      // paralelizam
const WAIT_MS     = Number(process.env.WAIT_MS || 800);        // dodatni ček nakon networkidle
const NAV_TIMEOUT = Number(process.env.NAV_TIMEOUT || 45000);  // ms

const start = new URL(START_URL);
const ORIGIN = start.origin;                    // https://hjftm.github.io
const PATH_PREFIX = start.pathname.replace(/\/+$/, "") || "/uvod"; // /uvod

// --- Pomoćne funkcije ---
function isInternalAllowed(urlStr) {
  try {
    const u = new URL(urlStr, ORIGIN);
    // ista domena i ispod /uvod
    return u.origin === ORIGIN && u.pathname.startsWith(PATH_PREFIX);
  } catch {
    return false;
  }
}

function toLocalPath(u) {
  // mapira https://.../uvod/abc/ -> snapshot-uvod/uvod/abc/index.html
  // ili https://.../uvod/abc.html -> snapshot-uvod/uvod/abc.html
  const url = new URL(u);
  let p = url.pathname;

  const isDir = p.endsWith("/");
  if (isDir) p = p.replace(/\/+$/, "");

  const base = path.join(OUT_DIR, p);
  const hasExt = path.extname(p);

  if (isDir || !hasExt) {
    return path.join(base, "index.html");
  }
  return path.join(OUT_DIR, p);
}

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function normalizeLinkHref(href) {
  // ukloni hash, zadrži query samo ako je potreban
  try {
    const u = new URL(href, ORIGIN);
    u.hash = "";
    return u.toString();
  } catch {
    return href;
  }
}

// --- Glavna logika snapshotiranja jedne stranice ---
async function snapshotPage(browser, pageUrl) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(NAV_TIMEOUT);
  page.setDefaultTimeout(NAV_TIMEOUT);

  await page.goto(pageUrl, { waitUntil: "networkidle2" });
  if (WAIT_MS > 0) await delay(WAIT_MS);

  // Ukloni sve <script> i prefetch/preload linkove, te in-page Observable runtime ako postoji
  await page.evaluate(() => {
    for (const s of Array.from(document.querySelectorAll("script"))) s.remove();
    for (const l of Array.from(document.querySelectorAll('link[rel="preload"], link[rel="modulepreload"], link[rel="prefetch"]'))) l.remove();
  });

  // Prikupi sve interne linkove na koje trebamo kasnije ići
  const links = await page.evaluate((origin, prefix) => {
    const out = new Set();
    document.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      try {
        const u = new URL(href, origin);
        // ignoriraj mailto, tel, hash-only i vanjsko
        if (!["http:", "https:"].includes(u.protocol)) return;
        if (u.hash && (u.pathname === location.pathname)) return; // hash u istoj stranici
        if (u.origin === origin && u.pathname.startsWith(prefix)) {
          out.add(u.toString());
        }
      } catch {}
    });
    return Array.from(out);
  }, ORIGIN, PATH_PREFIX);

  // Preusmjeri A.href za interne linkove na relativne lokalne putanje (da radi offline)
  await page.evaluate((origin, prefix) => {
    function makeRel(fromPath, toPath) {
      const fromParts = fromPath.split("/").filter(Boolean);
      const toParts   = toPath.split("/").filter(Boolean);
      while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
        fromParts.shift(); toParts.shift();
      }
      const up = Array(fromParts.length - 1).fill(".."); // -1 jer from je datoteka
      return [...up, ...toParts].join("/") || "index.html";
    }

    const fromPath = location.pathname.endsWith("/")
      ? location.pathname + "index.html"
      : location.pathname;

    document.querySelectorAll("a[href]").forEach(a => {
      const raw = a.getAttribute("href");
      if (!raw) return;
      try {
        const u = new URL(raw, origin);
        if (u.origin === origin && u.pathname.startsWith(prefix)) {
          let p = u.pathname;
          const isDir = p.endsWith("/");
          if (isDir) p = p.replace(/\/+$/, "");
          const hasExt = /\.[a-z0-9]+$/i.test(p);
          const target = hasExt ? p : p + "/index.html";
          const rel = makeRel(fromPath, target);
          a.setAttribute("href", rel);
        }
      } catch {}
    });
  }, ORIGIN, PATH_PREFIX);

  const html = await page.content(); // već bez <script> koje smo uklonili
  await page.close();
  return { html, links: links.map(normalizeLinkHref) };
}

// --- Runner s paralelnim radnicima ---
async function run() {
  // Čisti izlazni direktorij
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const queue = [START_URL];
    const seen = new Set(queue);
    const savedFiles = new Set();

    async function worker() {
      while (queue.length) {
        const url = queue.shift();
        if (!url) break;
        if (!isInternalAllowed(url)) continue;

        const outFile = toLocalPath(url);
        if (savedFiles.has(outFile)) continue;

        console.log("▶ Snapshot:", url);
        try {
          const { html, links } = await snapshotPage(browser, url);
          ensureDirFor(outFile);
          fs.writeFileSync(outFile, html, "utf8");
          savedFiles.add(outFile);

          for (const l of links) {
            if (seen.size >= MAX_PAGES) break;
            if (isInternalAllowed(l) && !seen.has(l)) {
              seen.add(l);
              queue.push(l);
            }
          }
        } catch (e) {
          console.error("✖ Error on", url, e && e.message ? e.message : e);
        }
      }
    }

    const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker());
    await Promise.all(workers);

    // Dodaj trivialni index ako start nije završio na /index.html
    const startIndex = toLocalPath(START_URL);
    if (!fs.existsSync(startIndex)) {
      ensureDirFor(startIndex);
      fs.writeFileSync(
        startIndex,
        "<!doctype html><meta charset='utf-8'><title>uvod</title><p>Prazno.</p>",
        "utf8"
      );
    }

    console.log(`Done. Saved into: ${OUT_DIR}`);
  } finally {
    await browser.close();
  }
}

// --- Start ---
run().catch(err => {
  console.error(err);
  process.exit(1);
});
