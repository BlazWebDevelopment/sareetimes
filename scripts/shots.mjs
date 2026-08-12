import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3000'
const OUT = 'shots'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } })

// Grab a real article URL off the front page rather than guessing the slug.
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
const articlePath = await page.getAttribute('a[href^="/article/"]', 'href')

const pages = [
  { name: 'home', path: '/' },
  { name: 'section-opinion', path: '/opinion' },
  { name: 'section-live', path: '/live' },
  { name: 'article', path: articlePath },
]

for (const p of pages) {
  const res = await page.goto(BASE + p.path, { waitUntil: 'networkidle' })
  console.log(`${p.path} -> ${res.status()}`)
  await page.screenshot({ path: `${OUT}/${p.name}.png`, fullPage: false })
}

await browser.close()
console.log('done')
