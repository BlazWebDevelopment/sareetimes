# Saree Times

A broadsheet-style daily news front page built with Next.js — politics, business, technology, sport and culture, set in ink on warm paper.

## Development

```bash
npm install
npm run dev
```

## Design system

Tokens live in `src/app/globals.css` as CSS custom properties, with a matching
Tailwind palette under the `saree` namespace in `tailwind.config.ts`.

- **Ink** `#17150f` on paper `#ffffff`, with warm cream `#faf8f3` surfaces
- **House accent** deep teal `#0e5b61` for links, kickers and section rules
- **Crimson** `#a4192c` reserved for live and breaking furniture only
- Square corners throughout; hairline rules separate columns

Typography is self-hosted from `src/fonts` and wired up in `src/app/layout.tsx`:

| Role | Face | CSS variable |
| --- | --- | --- |
| Masthead wordmark, numerals | Playfair Display | `--font-wordmark` |
| Headlines, decks, article body | Source Serif 4 | `--font-editorial` |
| Navigation, kickers, meta, forms | Libre Franklin | `--font-ui` |

## Brand assets

The logo, favicon, app icons, social card and web manifest are all generated
from real Playfair Display outlines, so they render identically without the
webfont loaded:

```bash
npm run brand
```

## Review screenshots

With the dev server running, capture every template at desktop and mobile
widths, plus a typography and console-error report:

```bash
node scripts/shots.mjs
```
