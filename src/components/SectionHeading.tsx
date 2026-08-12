import Link from 'next/link'

/** Uppercase label sitting on a heavy rule — the standard section marker. */
export default function SectionHeading({
  title,
  href,
  linkLabel = 'More',
  aside,
}: {
  title: string
  href?: string
  linkLabel?: string
  aside?: string
}) {
  return (
    <div className="dr-section-accent flex items-baseline justify-between gap-3 mb-3">
      <h2 className="font-sans font-bold text-[13px] uppercase tracking-[0.1em] text-[color:var(--text-primary)]">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-[11px] font-sans uppercase tracking-[0.06em] text-[color:var(--accent)] hover:underline"
        >
          {linkLabel}
        </Link>
      ) : aside ? (
        <span className="shrink-0 text-[11px] font-sans text-[color:var(--text-muted)]">
          {aside}
        </span>
      ) : null}
    </div>
  )
}
