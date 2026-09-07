const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  page.on('console', m => logs.push(m.text()));
  page.on('pageerror', e => logs.push('PAGEERROR: '+e.message));
  await page.goto('http://localhost:3016/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4200); // loading screen
  // Screenshot BEFORE scrolling into services (should be hidden/at initial state, not yet visible - that's expected and fine)
  // Now scroll slowly into services intro
  await page.evaluate(() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(200);
  // scroll a bit more to trigger enter threshold
  await page.evaluate(() => window.scrollBy(0, 150));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/tmp/anim_intro.png' });

  // Scroll to first panel
  await page.locator('.svc-panel').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollBy(0, 100));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/tmp/anim_panel1.png' });

  console.log('CONSOLE LOGS:', JSON.stringify(logs.slice(0,20)));

  // Sanity: check opacity of key elements is NOT stuck at 0 after settle
  const opacities = await page.evaluate(() => {
    const sel = ['.services-eyebrow', '.services-headline-line', '.services-subtext', '.services-intro-visual', '.svc-tag', '.svc-title', '.svc-desc', '.svc-chip', '.svc-mockup-col'];
    return sel.map(s => {
      const el = document.querySelector(s);
      return el ? { s, op: getComputedStyle(el).opacity } : { s, op: 'NOT FOUND' };
    });
  });
  console.log('OPACITIES:', JSON.stringify(opacities, null, 2));
  await browser.close();
})();
