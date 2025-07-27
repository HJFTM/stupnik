const puppeteer = require('puppeteer');
const fs = require('fs');
const urls = [
  'https://hjftm.github.io/uvod/pages/0%20Uvod/naslovnica',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/uvod',
  'https://hjftm.github.io/uvod/pages/0%20Uvod/dogadjaji'
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  let combinedHTML = '<html><head><style>body { font-family: sans-serif; }</style></head><body>';

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const content = await page.content();
    const body = await page.$eval('body', el => el.innerHTML);
    combinedHTML += `<div style="page-break-after: always;">${body}</div>`;
    console.log(`✔ Dodano: ${url}`);
  }

  combinedHTML += '</body></html>';

  // Spremi kao privremeni HTML
  const tempPath = 'pdf/combined.html';
  if (!fs.existsSync('pdf')) fs.mkdirSync('pdf');
  fs.writeFileSync(tempPath, combinedHTML);

  // Učitaj lokalno spremljeni HTML i generiraj PDF
  await page.goto(`file://${process.cwd()}/${tempPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'pdf/uvod_sve_stranice.pdf', format: 'A4', printBackground: true });

  await browser.close();
})();
