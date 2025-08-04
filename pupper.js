// scrape.js
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,               // run in a visible window
    defaultViewport: null,         // use full available size
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1280,800'
    ]
  })

  const page = await browser.newPage()

  // 1) Spoof UA + languages + timezone
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/115.0.0.0 Safari/537.36'
  )
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  })
  await page.emulateTimezone('America/New_York')  // or your preferred TZ

  // 2) Navigate and wait for Cloudflare’s challenge + redirect
  await page.goto(
    'https://drednot.io/leaderboard/?cat=boss_lazer&by=pilot',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  )

  // 3) Wait until Cloudflare check is gone and the table is visible
  await page.waitForFunction(
    () => !document.title.toLowerCase().includes('just a moment'),
    { timeout: 60000 }
  )
  // 4) Wait for the actual leaderboard rows to appear
  await page.waitForSelector('table.leaderboard tbody tr', { timeout: 60000 })

  // 5) Scrape the rows
  const rows = await page.$$eval(
    'table.leaderboard tbody tr',
    trs => trs.map(tr => {
      const [rank, pilot, score] = Array.from(tr.querySelectorAll('td'))
        .map(td => td.innerText.trim())
      return { rank, pilot, score }
    })
  )

  console.log(rows)
  await browser.close()
})().catch(err => {
  console.error('❌ Error during scraping:', err)
  process.exit(1)
})
