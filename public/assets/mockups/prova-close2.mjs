import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", defaultViewport: { width: 1440, height: 1600, deviceScaleFactor: 2 } });
const page = await browser.newPage();
await page.goto("http://localhost:3000/#prova", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 1500));
const grid = await page.$('[id="prova"] .grid');
if (grid) await grid.screenshot({ path: '/tmp/prova-final.png' });
else await page.screenshot({ path: '/tmp/prova-final.png' });
await browser.close();
