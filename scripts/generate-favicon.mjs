// Generate public/favicon.ico from public/logo.png
// Usage: node scripts/generate-favicon.mjs
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const logoPath = resolve(root, 'public/logo.png')
const icoPath = resolve(root, 'public/favicon.ico')

const sizes = [16, 32, 48, 64]
const pngs = await Promise.all(
  sizes.map((size) =>
    sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer()
  )
)

const ico = await pngToIco(pngs)
await writeFile(icoPath, ico)

console.log(`Wrote ${icoPath} (${ico.length} bytes) with sizes: ${sizes.join(', ')}`)
