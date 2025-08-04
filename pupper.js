const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Use the stealth plugin to evade detection
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // run in headful mode to look more human
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set a realistic user-agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

  // Optional: Set a real viewport size
  await page.setViewport({ width: 1366, height: 768 });

  // Navigate to the page
  await page.goto('https://https://drednot.io/leaderboard/?cat=boss_lazer&by=pilot', { waitUntil: 'networkidle2' });

  // Wait extra time if necessary (Cloudflare JS challenge)
  await page.waitForTimeout(5000);

  // Do your scraping
  const content = await page.content();
  console.log(content);

  await browser.close();
})();
