// scripts/generate-static.js
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { uvodPages } from "../observablehq.uvod.js";
import { getRodEntitetiIzvoriPages } from "../observablehq.rodovi.js";
import { obiteljiPages } from "../observablehq.obitelji.js";

import { CURRENT_PROJECT, data } from "../observablehq.base.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- 1) Odredi stranice i BASE_URL
const isUvod = CURRENT_PROJECT === "Uvod";
const isObitelji = CURRENT_PROJECT === "Obitelji";

const BASE_URL = isUvod
  ? "https://hjftm.github.io/uvod"
  : `https://hjftm.github.io/${CURRENT_PROJECT.toLowerCase()}`;

// Grupi stranica prema projektu
let pages;
if (isUvod) pages = uvodPages;
else if (isObitelji) pages = obiteljiPages;
else pages = getRodEntitetiIzvoriPages(CURRENT_PROJECT, data);

// Pomoćna: flatten na pune URL-ove
let flattenPages;
if (isUvod) {
  flattenPages = pages.flatMap(group =>
    group.pages.map(p => `${BASE_URL}${p.path}`)
  );
} else if (isObitelji) {
  // Obitelji koristi pathEncoded2 po tvojoj postojećoj logici
  flattenPages = pages.flatMap(group =>
    group.pages.map(p => `${BASE_URL}${p.pathEncoded2}`)
  );
} else {
  // Rodovi: prisilno dodaj ROD parametar (bitno za sadržaj!)
  flattenPages = pages.flatMap(group =>
    group.pages.map(p => `${BASE_URL}${p.path}?ROD=${encodeURIComponent(CURRENT_PROJECT)}`)
  );
}

// Uvod dodatne stranice
const extraPages = isUvod
  ? ["/pages/alati", "/pages/autor", "/pages/KONCEPT/Navigacija"]
      .map(p => `${BASE_URL}${p}`)
  : [];

const urls = [...new Set([...flattenPages, ...extraPages])]; // de-dupe

// --- 2) Izlazni direktorij
// Zadano u gh-pages/pages/<PROJECT>/..., ili koristi PROCESS.OUTPUT_DIR
const projectFolderName = CURRENT_PROJECT; // npr. "Bosna", "Stupnik", "Uvod", "Obitelji"
const defaultOutRoot = path.resolve(__dirname, "..", "..", "gh-pages", "pages", projectFolderName);
const OUT_ROOT = process.env.OUTPUT_DIR
  ? path.resolve(__dirname, "..", "..", process.env.OUTPUT_DIR)
  : defaultOutRoot;

// --- 3) Pomoćne funkcije
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function urlToOutPath(fullUrl) {
  // Mapiraj URL na lokalni path: gh-pages/pages/<PROJECT>/<url.path>/index.html
  // Ignoriramo query dio (?ROD=...), jer je on već "utisnut" u renderirani sadržaj.
  const { pathname } = new URL(fullUrl);
  // Ukloni početni '/'; kreiraj folder hijerarhiju + index.html
  const relPath = pathname.replace(/^\//, ""); // npr. 'pages/ENTITET/mjesto/Popovići'
  const outDir = path.join(OUT_ROOT, relPath);
  const outFile = path.join(outDir, "index.html");
  return { outDir, outFile };
}

/**
 * Vraća kompletan, statičan HTML dokument:
 * - bez <script> tagova
 * - s <base> kako bi relativni linkovi radili i iz statike
 */
async function snapshotCurrentPage(page) {
  return await page.evaluate(() => {
    const clone = document.documentElement.cloneNode(true);

    // Ukloni sve <script> tagove (uključivo inline i external)
    clone.querySelectorAll("script").forEach(s => s.remove());

    // Ukloni <link rel="modulepreload"> i sl. ako želiš čistiji izlaz (opcionalno)
    clone.querySelectorAll('link[rel="modulepreload"]').forEach(l => l.remove());

    // Osiguraj <head> postoji
    const head = clone.querySelector("head") || clone.insertBefore(document.createElement("head"), clone.firstChild);

    // Ubaci <base> za relativne URL-ove (na direktorij stranice)
    const base = document.createElement("base");
    const hrefBase = location.origin + location.pathname.replace(/[^/]*$/, ""); // do zadnjeg '/'
    base.setAttribute("href", hrefBase);
    head.prepend(base);

    // (Opcionalno) Dodaj meta za statički snapshot
    const meta = document.createElement("meta");
    meta.setAttribute("name", "generator");
    meta.setAttribute("content", "puppeteer-static-snapshot");
    head.prepend(meta);

    // (Opcionalno) Dodaj noscript napomenu
    const noscript = document.createElement("noscript");
    noscript.textContent = "Ovo je statički HTML snapshot (JavaScript je uklonjen).";
    head.appendChild(noscript);

    // Vrati puni dokument s DOCTYPE
    return "<!DOCTYPE html>\n" + clone.outerHTML;
  });
}

// --- 4) Glavna rutina
(async () => {
  console.log(`▶ Generiram statične stranice za projekt: ${CURRENT_PROJECT}`);
  console.log(`   Broj URL-ova: ${urls.length}`);
  console.log(`   Izlazni root: ${OUT_ROOT}\n`);

  ensureDir(OUT_ROOT);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  // Malo “realnog” viewporta pomaže kod layouta
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  for (const url of urls) {
    try {
      console.log(`⏳ Otvaram: ${url}`);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      // Važno: Ako stranica čita ?ROD= parametar tek u runtime-u,
      // čekamo da se <main> popuni (kao i u PDF skripti).
      await page.waitForSelector("main", { timeout: 30_000 });

      const html = await snapshotCurrentPage(page);

      const { outDir, outFile } = urlToOutPath(url);
      ensureDir(outDir);
      fs.writeFileSync(outFile, html, "utf8");

      console.log(`✔ Snimljeno: ${outFile}`);
    } catch (e) {
      console.error(`❌ Greška za ${url}: ${e.message}`);
      // I dalje kreiraj minimalnu stranicu s napomenom
      const { outDir, outFile } = urlToOutPath(url);
      ensureDir(outDir);
      const fallback = `<!DOCTYPE html><meta charset="utf-8"><title>Greška</title><body><p>⚠️ Neuspješno dohvaćeno: ${url}</p></body>`;
      fs.writeFileSync(outFile, fallback, "utf8");
    }
  }

  await browser.close();
  console.log(`\n✅ Gotovo. Statičke stranice su u: ${OUT_ROOT}`);
})();
