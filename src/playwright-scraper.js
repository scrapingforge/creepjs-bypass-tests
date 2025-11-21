const { chromium: chromiumExtra } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const fs = require('fs');
const path = require('path');

// Example 1: Playwright with Stealth Plugin (Headless)
async function testStealthPlaywrightHeadless() {
  console.log('Testing Playwright with Stealth Plugin (Headless)...');

  chromiumExtra.use(stealth);

  const browser = await chromiumExtra.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://abrahamjuliot.github.io/creepjs/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(10000);

  // Take screenshot
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  await page.screenshot({ path: path.join(dataDir, 'playwright-stealth-headless.png'), fullPage: true });

  const trustScore = await page.evaluate(() => {
    const el = document.querySelector('.lies');
    return el ? el.textContent : 'Not found';
  });

  console.log('Stealth Playwright (Headless) Trust Score:', trustScore);
  await browser.close();
}

// Example 2: Playwright with Stealth Plugin + Xvfb (Virtual Display)
async function testStealthPlaywrightXvfb() {
  console.log('Testing Playwright with Stealth + Xvfb...');

  chromiumExtra.use(stealth);

  const browser = await chromiumExtra.launch({
    headless: false, // Use Xvfb virtual display
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080'
    ]
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://abrahamjuliot.github.io/creepjs/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(10000);

  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  await page.screenshot({ path: path.join(dataDir, 'playwright-stealth-xvfb.png'), fullPage: true });

  const trustScore = await page.evaluate(() => {
    const el = document.querySelector('.lies');
    return el ? el.textContent : 'Not found';
  });

  console.log('Stealth Playwright (Xvfb) Trust Score:', trustScore);
  await browser.close();
}

(async () => {
  await testStealthPlaywrightHeadless();
  console.log('\n---\n');
  await testStealthPlaywrightXvfb();
})();
