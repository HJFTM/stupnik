// generate-static-html.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ROD = 'Bosna'; // Promijeni po potrebi
const PAGE_URL = `https://hjftm.github.io/bosna/pages/1_Jularic/01.1.prezime_ilaric?ROD=${ROD}`;
const OUTPUT_DIR = './public/static-html/';
const OUTPUT_FILE = `01.1.prezime_ilaric.${ROD}.html`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`Otvaram ${PAGE_URL}...`);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle2' });

  // Po potrebi promijeni selektor u nešto što potvrđuje da je sve učitano
  await page.waitForSelector('main');

  const html = await page.content();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, OUTPUT_FILE), html);

  console.log(`Spremljeno kao ${path.join(OUTPUT_DIR, OUTPUT_FILE)}`);
  await browser.close();
})();
