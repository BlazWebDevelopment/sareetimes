import Link from 'next/link'

/** Uppercase label sitting on a rule — the standard section marker. */
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
    <div className="st-section-accent mb-3.5 flex items-baseline justify-between gap-3">
      <h2 className="font-sans text-[12.5px] font-bold uppercase tracking-[0.12em] text-[color:var(--text-primary)]">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] hover:underline"
        >
          {linkLabel} &rarr;
        </Link>
      ) : aside ? (
        <span className="shrink-0 font-sans text-[11px] text-[color:var(--text-muted)]">
          {aside}
        </span>
      ) : null}
    </div>
  )
}
