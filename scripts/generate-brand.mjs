// Generate every Saree Times brand asset from real Playfair Display outlines.
//
//   node scripts/generate-brand.mjs
//
// Writes: public/logo.svg, public/favicon.svg, public/logo.png,
//         public/apple-icon.png, public/favicon.ico, public/og-image.png
//
// Glyphs are converted to vector paths rather than left as <text>, so the
// wordmark and monogram render identically in browsers, rasterisers and
// anywhere the SVG is used without the webfont loaded.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import https from 'node:https'
import opentype from 'opentype.js'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = resolve(root, 'public')
const cacheDir = resolve(__dirname, '.cache')

const FONT_URL =
  'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display@4.5.11/files/playfair-display-latin-700-normal.woff'
const FONT_CACHE = resolve(cacheDir, 'playfair-display-700.woff')

const INK = '#17150f'
const TEAL = '#0e5b61'
const CREAM = '#faf8f3'
const PAPER = '#ffffff'
const HAIRLINE = '#ddd5c6'
const MUTED = '#7b7466'

function download(url) {
  return new Promise((res, rej) => {
    https
      .get(url, { headers: { 'user-agent': 'Mozilla/5.0' } }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          return download(r.headers.location).then(res, rej)
        }
        if (r.statusCode !== 200) return rej(new Error(`${url} -> ${r.statusCode}`))
        const chunks = []
        r.on('data', (d) => chunks.push(d))
        r.on('end', () => res(Buffer.concat(chunks)))
      })
      .on('error', rej)
  })
}

async function loadFont() {
  await mkdir(cacheDir, { recursive: true })
  if (!existsSync(FONT_CACHE)) {
    const buf = await download(FONT_URL)
    await writeFile(FONT_CACHE, buf)
    console.log(`Cached font (${buf.length} bytes)`)
  }
  const buf = await readFile(FONT_CACHE)
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
}

/**
 * Lay out `text` as SVG path data, scaled so its inked bounding box exactly
 * fills the requested box, then centred on (cx, cy).
 *
 * The path data is serialised by hand: opentype's own `toPathData` applies a
 * y-flip against a recomputed bounding box, which corrupts already-transformed
 * coordinates.
 */
function glyphPath(font, text, { height, width, cx, cy, letterSpacing = 0 }) {
  const unitSize = 1000
  const path = font.getPath(text, 0, 0, unitSize, { letterSpacing })
  const bb = path.getBoundingBox()
  const bw = bb.x2 - bb.x1
  const bh = bb.y2 - bb.y1

  let scale
  if (height != null && width != null) scale = Math.min(height / bh, width / bw)
  else if (height != null) scale = height / bh
  else scale = width / bw

  const dx = cx - (bb.x1 + bw / 2) * scale
  const dy = cy - (bb.y1 + bh / 2) * scale

  const px = (v) => Number((v * scale + dx).toFixed(2))
  const py = (v) => Number((v * scale + dy).toFixed(2))

  const parts = []
  for (const c of path.commands) {
    switch (c.type) {
      case 'M':
        parts.push(`M${px(c.x)} ${py(c.y)}`)
        break
      case 'L':
        parts.push(`L${px(c.x)} ${py(c.y)}`)
        break
      case 'Q':
        parts.push(`Q${px(c.x1)} ${py(c.y1)} ${px(c.x)} ${py(c.y)}`)
        break
      case 'C':
        parts.push(
          `C${px(c.x1)} ${py(c.y1)} ${px(c.x2)} ${py(c.y2)} ${px(c.x)} ${py(c.y)}`
        )
        break
      case 'Z':
        parts.push('Z')
        break
      default:
        throw new Error(`Unhandled path command: ${c.type}`)
    }
  }

  const d = parts.join('')
  if (d.includes('NaN')) throw new Error(`Glyph path for "${text}" produced NaN`)

  return { d, width: bw * scale, height: bh * scale }
}

const font = await loadFont()

/* ------------------------------------------------------------------
   1. Monogram tiles — a didone "S" on the house teal.
   The large tile carries a keyline; the small one drops it so the
   16px favicon stays crisp.
   ------------------------------------------------------------------ */

function monogramSvg({ size, keyline }) {
  const glyph = glyphPath(font, 'S', {
    height: size * (keyline ? 0.5 : 0.62),
    cx: size / 2,
    cy: size / 2,
  })
  const inset = size * 0.055
  const stroke = size * 0.016
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Saree Times">
  <rect width="${size}" height="${size}" fill="${TEAL}"/>
${
  keyline
    ? `  <rect x="${inset}" y="${inset}" width="${size - inset * 2}" height="${
        size - inset * 2
      }" fill="none" stroke="${CREAM}" stroke-width="${stroke}" opacity="0.9"/>\n`
    : ''
}  <path d="${glyph.d}" fill="${CREAM}"/>
</svg>
`
}

const logoSvg = monogramSvg({ size: 512, keyline: true })
const faviconSvg = monogramSvg({ size: 64, keyline: false })

await writeFile(resolve(publicDir, 'logo.svg'), logoSvg)
console.log('Wrote public/logo.svg')
await writeFile(resolve(publicDir, 'favicon.svg'), faviconSvg)
console.log('Wrote public/favicon.svg')

/* ------------------------------------------------------------------
   2. Raster icons
   ------------------------------------------------------------------ */

const logoPng = await sharp(Buffer.from(logoSvg)).resize(512, 512).png().toBuffer()
await writeFile(resolve(publicDir, 'logo.png'), logoPng)
console.log('Wrote public/logo.png')

const applePng = await sharp(Buffer.from(logoSvg)).resize(180, 180).png().toBuffer()
await writeFile(resolve(publicDir, 'apple-icon.png'), applePng)
console.log('Wrote public/apple-icon.png')

for (const size of [192, 512]) {
  const png = await sharp(Buffer.from(logoSvg)).resize(size, size).png().toBuffer()
  await writeFile(resolve(publicDir, `icon-${size}.png`), png)
  console.log(`Wrote public/icon-${size}.png`)
}

const icoSizes = [16, 32, 48, 64]
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer()
  )
)
const ico = await pngToIco(icoPngs)
await writeFile(resolve(publicDir, 'favicon.ico'), ico)
console.log(`Wrote public/favicon.ico (${ico.length} bytes) sizes: ${icoSizes.join(', ')}`)

/* ------------------------------------------------------------------
   3. Social card — the masthead set on cream paper between rules.
   ------------------------------------------------------------------ */

const OG_W = 1200
const OG_H = 630
const wordmark = glyphPath(font, 'Saree Times', {
  width: 900,
  height: 150,
  cx: OG_W / 2,
  cy: 300,
  letterSpacing: -0.01,
})

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${OG_W}" height="14" fill="${TEAL}"/>
  <rect x="90" y="150" width="${OG_W - 180}" height="1" fill="${HAIRLINE}"/>
  <text x="${OG_W / 2}" y="128" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="7" fill="${MUTED}" text-anchor="middle">EST. 2026 &#183; THE DAILY RECORD</text>
  <path d="${wordmark.d}" fill="${INK}"/>
  <rect x="90" y="404" width="${OG_W - 180}" height="2" fill="${INK}"/>
  <text x="${OG_W / 2}" y="462" font-family="Georgia, serif" font-size="30" fill="${INK}" text-anchor="middle">Reported with care &#183; Written to last</text>
  <text x="${OG_W / 2}" y="536" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="${TEAL}" text-anchor="middle">POLITICS &#183; BUSINESS &#183; TECHNOLOGY &#183; SPORT &#183; CULTURE</text>
  <rect x="0" y="${OG_H - 14}" width="${OG_W}" height="14" fill="${INK}"/>
</svg>
`

const ogPng = await sharp(Buffer.from(ogSvg)).png().toBuffer()
await writeFile(resolve(publicDir, 'og-image.png'), ogPng)
console.log('Wrote public/og-image.png')

/* ------------------------------------------------------------------
   4. Wordmark SVG, for anywhere the webfont cannot be relied on.
   ------------------------------------------------------------------ */

const markW = 720
const markH = 130
const flat = glyphPath(font, 'Saree Times', {
  width: markW - 20,
  height: markH - 30,
  cx: markW / 2,
  cy: markH / 2,
  letterSpacing: -0.01,
})
await writeFile(
  resolve(publicDir, 'wordmark.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="${markW}" height="${markH}" viewBox="0 0 ${markW} ${markH}" role="img" aria-label="Saree Times">
  <path d="${flat.d}" fill="${INK}"/>
</svg>
`
)
console.log('Wrote public/wordmark.svg')

/* ------------------------------------------------------------------
   5. Web app manifest
   ------------------------------------------------------------------ */

await writeFile(
  resolve(publicDir, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Saree Times',
      short_name: 'Saree Times',
      description:
        'Saree Times is a daily record of the stories that matter — politics, business, technology, sport and culture.',
      start_url: '/',
      display: 'standalone',
      background_color: PAPER,
      theme_color: TEAL,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  ) + '\n'
)
console.log('Wrote public/site.webmanifest')
