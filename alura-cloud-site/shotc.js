const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  page.on('console', m => logs.push(m.text()));
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4200);
  await page.evaluate(() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
  const eyebrow = await page.evaluate(() => {
    const el = document.querySelector('.services-eyebrow');
    return el ? { opacity: getComputedStyle(el).opacity, inlineOpacity: el.style.opacity, transform: getComputedStyle(el).transform } : null;
  });
  console.log("EYEBROW:", JSON.stringify(eyebrow));
  console.log("LOGS:", JSON.stringify(logs.filter(l => l.includes('DEBUG'))));
  await browser.close();
})();
