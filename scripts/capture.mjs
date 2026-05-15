import puppeteer from 'puppeteer-core';

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000/";

const shots = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-820", width: 820, height: 1180 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

for (const { name, width, height } of shots) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    defaultViewport: { width, height, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: `/tmp/kyron-shots/${name}-full.png`, fullPage: true });

  await page.evaluate(() => document.getElementById("cta")?.scrollIntoView({ behavior: "instant", block: "start" }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `/tmp/kyron-shots/${name}-cta.png`, fullPage: false });

  await page.evaluate(() => document.getElementById("prova")?.scrollIntoView({ behavior: "instant", block: "start" }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `/tmp/kyron-shots/${name}-prova.png`, fullPage: false });

  await browser.close();
  console.log(`${name} done`);
}
