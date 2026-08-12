import { SITE_NAME } from '@/lib/brand'

/**
 * The square monogram tile. Deliberately rebuilt in CSS rather than loaded as
 * an image so it matches `public/logo.svg` exactly while costing no request —
 * both are a Playfair Display bold "S" in cream on the house teal.
 */
export function BrandMark({
  size = 40,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`st-brand-mark inline-flex shrink-0 items-center justify-center bg-[color:var(--accent)] font-masthead font-bold leading-none text-[color:var(--bg-surface)] ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.66,
        boxShadow: `inset 0 0 0 ${Math.max(1, Math.round(size * 0.028))}px rgba(250, 248, 243, 0.85)`,
      }}
    >
      <span style={{ transform: `translateY(${size * 0.03}px)` }}>S</span>
    </span>
  )
}

/** The masthead wordmark, set in the display didone. */
export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`st-wordmark ${className}`}>{SITE_NAME}</span>
}
