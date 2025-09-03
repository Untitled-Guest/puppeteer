const { timeout } = require('puppeteer');
const puppeteer = require('puppeteer');
// Paste the WebSocket URL you copied from the JSON page here
const browserWSEndpoint = 'ws://localhost:9222/devtools/browser/c5ea2e4b-1d69-4057-a583-05fd61f20e83';

(async () => {
    // Connect to the running browser instance
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
        headless: false,
    });

    // You can now get a list of existing pages (tabs)
    const pages = await browser.pages();
    
    // Or you can create a new page
    const page = await browser.newPage();
    
    // Navigate and scrape just like before
    await page.goto('https://drednot.io/leaderboard/?cat=boss_lazer&by=ship');

    // You can also interact with an existing page by getting it from the pages array
    // if (pages.length > 0) {
    //     const existingPage = pages[0]; // Assuming you want the first tab
    //     console.log(`Title of the existing page: ${await existingPage.title()}`);
    // }

    // await page.waitForTimeout(5000);
    const content = await page.content();
    setTimeout(function() {
  console.log(content);
}, 60000);

    // You can close the new page, but be careful not to close the browser
    // await page.close();

    // To prevent Puppeteer from closing the entire browser instance,
    // do not call `browser.close()` at the end of your script.
    // The connection will simply be disconnected.
})();