// scripts/crawl-and-snapshot.js
// Node 20+
// npm i puppeteer fs-extra

import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

const OUT_DIR = path.resolve("prezime-site");

const PROJECTS = [
  { name: "Uvod",      base: "https://hjftm.github.io/uvod",      startPath: "/pages/izbornik" },
  { name: "Bosna",     base: "https://hjftm.github.io/bosna",     startPath: "/pages/izbornik" },
  { name: "Stupnik",   base: "https://hjftm.github.io/stupnik",   startPath: "/pages/izbornik" },
  { name: "Dubrovnik", base: "https://hjftm.github.io/dubrovnik", startPath: "/pages/izbornik" },
];

const ALLOW_PATHS = [
  /^\/$/,                      // root (ako ga ima)
  /^\/pages(\/.*)?$/,          // tvoje generirane stranice
  /^\/assets(\/.*)?$/,         // statika ako postoji
  /^\/ENTITET(\/.*)?$/,        // ako koristiš ovakav korijen
];

const IGNORE_LINKS = [
  /^mailto:/i, /^tel:/i, /^javascript:/i, /^#$/i
];

const MAX_PAGES_PER_PROJECT = 250000; // praktično “bez limita”
const CONCURRENCY = 4;
const WAIT_AFTER_IDLE_MS = 800;
const NAV_TIMEOUT_MS = 90_000;

function normUrl(u) { try { return new URL(u); } catch { return null; } }
function sameOrigin(u1, u2) { return u1.origin === u2.origin; }
function withinBasePath(u, base) {
  const bp = base.pathname.replace(/\/$/, "");
  return u.pathname.startsWith(bp);
}
function allowPath(u) {
  const p = u.pathname.replace(/\/+$/, "") || "/";
  return ALLOW_PATHS.some(rx => rx.test(p));
}
function shouldIgnore(href) { return IGNORE_LINKS.some(rx => rx.test(href)); }

function canonicalHref(raw, baseForResolve) {
  let u;
  try { u = new URL(raw, baseForResolve); } catch { return null; }
  u.hash = "";
  u.search = "";
  return u.toString();
}

function mapLinksToPrezime(html) {
  const reps = [
    { from: /https?:\/\/hjftm\.github\.io\/uvod/gi,      to: "/prezime/Uvod" },
    { from: /https?:\/\/hjftm\.github\.io\/bosna/gi,     to: "/prezime/Bosna" },
    { from: /https?:\/\/hjftm\.github\.io\/stupnik/gi,   to: "/prezime/Stupnik" },
    { from: /https?:\/\/hjftm\.github\.io\/dubrovnik/gi, to: "/prezime/Dubrovnik" },

    // fallbacki za root-relativne linkove
    // (radi samo kad su već root-relativni; intra‑projektno prepisi prema “trenutnom” projektu)
    { from: /href="\/pages/gi, to: 'href="/prezime/__PROJECT__/pages' },
    { from: /src="\/pages/gi,  to: 'src="/prezime/__PROJECT__/pages'  },
  ];
  return { apply(projectName) {
    return reps.reduce((acc, r) => acc.replace(r.from,
      typeof r.to === "string" ? r.to.replace("__PROJECT__", projectName) : r.to),
      html);
  }};
}

async function ensurePath(outProjectDir, pageUrl, baseUrl) {
  const base = normUrl(baseUrl);
  const u = normUrl(pageUrl);
  if (!base || !u) throw new Error("Bad URL for path build");

  // relativni dio unutar projekta (bez query/hash – već smo canonicalizirali)
  let rel = u.pathname.substring(base.pathname.replace(/\/$/, "").length);
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") rel = "/index";
  if (rel.endsWith("/")) rel += "index";

  const dir = path.join(outProjectDir, rel);
  await fs.ensureDir(dir);
  return path.join(dir, "index.html");
}

async function serializeWithSingleFile(page) {
  await page.addScriptTag({
    url: "https://unpkg.com/single-file-core@1.2.42/single-file-core.bundle.js",
  });
  const { content } = await page.evaluate(async () => {
    const opt = {
      removeHiddenElements: false,
      removeUnusedStyles: false,
      compressHTML: false,
      loadDeferredImages: true,
      loadDeferredImagesMaxIdleTime: 1500,
      maxResourceSizeEnabled: true,
      maxResourceSize: 80 * 1024 * 1024,
    };
    const result = await window.singlefile.getPageData(opt);
    return { content: result.content };
  });
  return content;
}

async function crawlProject(browser, project) {
  const outProjectDir = path.join(OUT_DIR, project.name);
  await fs.emptyDir(outProjectDir);

  const base = normUrl(project.base);
  const start = new URL(project.startPath, project.base).toString();

  const queue = [start];
  const visited = new Set();

  const workers = Array.from({ length: CONCURRENCY }, () => (async function worker() {
    const page = await browser.newPage();
    page.setDefaultTimeout(NAV_TIMEOUT_MS);

    while (queue.length && visited.size < MAX_PAGES_PER_PROJECT) {
      const nextRaw = queue.shift();
      const next = canonicalHref(nextRaw, project.base);
      if (!next || visited.has(next)) continue;
      visited.add(next);

      try {
        await page.goto(next, { waitUntil: "networkidle0" });
        await page.waitForTimeout(WAIT_AFTER_IDLE_MS);

        // Prikupi linkove
        const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')).filter(Boolean));
        for (const href of hrefs) {
          if (shouldIgnore(href)) continue;
          const abs = canonicalHref(href, next);
          if (!abs) continue;

          const u = normUrl(abs);
          if (!u) continue;
          if (!sameOrigin(u, base)) continue;
          if (!withinBasePath(u, base)) continue;
          if (!allowPath(u)) continue;

          if (!visited.has(abs) && !queue.includes(abs)) queue.push(abs);
        }

        // Snapshot
        let html = await serializeWithSingleFile(page);

        // Prepisi linkove na /prezime/<Projekt>...
        const linker = mapLinksToPrezime(html);
        html = linker.apply(project.name);

        // Upis
        const outFile = await ensurePath(outProjectDir, next, project.base);
        await fs.writeFile(outFile, html, "utf8");
        console.log("✔", project.name, "->", outFile.replace(process.cwd()+"/",""));
      } catch (e) {
        console.warn("⚠️  Failed:", next, e?.message || e);
      }
    }

    await page.close();
  })());

  await Promise.all(workers);
  console.log(`Project ${project.name}: ${visited.size} stranica snimljeno.`);
}

async function main() {
  await fs.ensureDir(OUT_DIR);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const p of PROJECTS) {
      console.log(`\n=== ${p.name} (${p.base}) ===`);
      await crawlProject(browser, p);
    }
  } finally {
    await browser.close();
  }
  console.log("\nAll done:", OUT_DIR);
}

main().catch(err => { console.error(err); process.exit(1); });
