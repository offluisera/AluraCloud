const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  page.on('console', m => logs.push(m.text()));
  page.on('pageerror', e => logs.push('PAGEERROR: '+e.message));
  await page.goto('http://localhost:3014/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4200);
  console.log("AFTER LOAD:", JSON.stringify(logs));
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(300);
  await page.evaluate(() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
  console.log("AFTER SCROLL:", JSON.stringify(logs));
  await browser.close();
})();
