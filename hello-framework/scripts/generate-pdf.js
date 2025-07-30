import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uvodPages } from '../observablehq.uvod.js';

const BASE_URL = 'https://hjftm.github.io/uvod';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output folder: gh-pages/ ako je definirano, inače fallback na public/
const outputDir = process.env.OUTPUT_DIR
  ? path.resolve(__dirname, '..', '..', process.env.OUTPUT_DIR)
  : path.join(__dirname, '..', 'public');

const pdfPath = path.join(outputDir, 'uvod.pdf');

// Kreiraj folder ako ne postoji
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });



// Pretvori uvodPages u flat listu URL-ova
const flattenPages = uvodPages.flatMap(group =>
  group.pages.map(page => `${BASE_URL}${page.path}`)
);

// Dodatne stranice koje nisu u uvodPages
const extraPages = [
  '/pages/alati',
  '/pages/autor',
  '/pages/KONCEPT/Navigacija'
].map(path => `${BASE_URL}${path}`);

// Konačna lista URL-ova
const urls = [...flattenPages, ...extraPages];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  let html = '<html><head><style>body { font-family: sans-serif; }</style></head><body>';

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      const main = await page.$eval('main', el => el.innerHTML);
      html += `<div style="page-break-after: always;">${main}</div>`;
      console.log(`✔ Dodano: ${url}`);
    } catch (e) {
      console.error(`❌ Greška pri ${url}: ${e.message}`);
      html += `<div style="page-break-after: always;"><p>⚠️ Neuspješno dohvaćeno: ${url}</p></div>`;
    }
  }

  html += '</body></html>';

  // Osiguraj da output folder postoji
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const now = new Date().toLocaleString('hr-HR', {
    timeZone: 'Europe/Zagreb',
    hour12: false
  });

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:10px; width:100%; padding-right:10px; text-align:right;">
        <span>${now}</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size:10px; width:100%; text-align:center;">
        <span class="pageNumber"></span>/<span class="totalPages"></span>
      </div>
    `,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });

  await browser.close();
  console.log(`📄 PDF generiran: ${pdfPath}`);
})();
