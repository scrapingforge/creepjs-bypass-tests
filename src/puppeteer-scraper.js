const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Example 1: Puppeteer with Stealth Plugin (Headless)
async function testStealthPuppeteerHeadless() {
  console.log('Testing Puppeteer with Stealth Plugin (Headless)...');

  puppeteerExtra.use(StealthPlugin());

  const browser = await puppeteerExtra.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://abrahamjuliot.github.io/creepjs/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 10000));

  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  await page.screenshot({ path: path.join(dataDir, 'puppeteer-stealth-headless.png'), fullPage: true });

  console.log('Screenshot saved: puppeteer-stealth-headless.png');
  await browser.close();
}

// Example 2: Puppeteer with Stealth Plugin + Xvfb (Virtual Display)
async function testStealthPuppeteerXvfb() {
  console.log('Testing Puppeteer with Stealth + Xvfb...');

  puppeteerExtra.use(StealthPlugin());

  const browser = await puppeteerExtra.launch({
    headless: false, // Use Xvfb virtual display
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://abrahamjuliot.github.io/creepjs/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 10000));

  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  await page.screenshot({ path: path.join(dataDir, 'puppeteer-stealth-xvfb.png'), fullPage: true });

  console.log('Screenshot saved: puppeteer-stealth-xvfb.png');
  await browser.close();
}

// Run both tests
(async () => {
  await testStealthPuppeteerHeadless();
  console.log('\n---\n');
  await testStealthPuppeteerXvfb();
})();
