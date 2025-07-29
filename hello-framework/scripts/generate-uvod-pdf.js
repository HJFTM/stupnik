import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output folder: gh-pages/ ako je definirano, inače fallback na public/
const outputDir = process.env.OUTPUT_DIR
  ? path.resolve(__dirname, '..', '..', process.env.OUTPUT_DIR)
  : path.join(__dirname, '..', 'public');

const pdfPath = path.join(outputDir, 'uvod.pdf');

const urls = [
  'https://hjftm.github.io/uvod/pages/0%20Uvod/1_Naslovnica',
  'https://hjftm.github.io/uvod/',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/2_Geomapa',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/3_Jularic',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/4_Ilaric',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/5_Rodovi_obitelji',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/6_Dogadjaji',
  'https://hjftm.github.io/uvod/pages/1_Jularic/01.1.prezime_ilaric',
  'https://hjftm.github.io/uvod/pages/1_Jularic/01.2.evolucija',
  'https://hjftm.github.io/uvod/pages/1_Prezime/prezime_slicno',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Drzava_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Zupe_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Mjesta_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Generacije_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Obitelji_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Brakovi_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Obitelji_povezane_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Zapisi_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Bolesti_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Groblje_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Migracije_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Migracije_masovne_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_Crkveni',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_Drzavni',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_Gradski',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_Radovi',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_Groblja',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Pismo_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Izvori_zapisi_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Kucedomacin_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Katastar_K',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Popis_stanovnika_K',
  'https://hjftm.github.io/uvod/pages/alati',
  'https://hjftm.github.io/uvod/pages/autor',
  'https://hjftm.github.io/uvod/pages/KONCEPT/Navigacija'
];

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
      top: '40mm',
      right: '20mm',
      bottom: '25mm',
      left: '25mm'
    }
  });

  await browser.close();
  console.log(`📄 PDF generiran: ${pdfPath}`);
})();
