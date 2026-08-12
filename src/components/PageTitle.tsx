/** Section / search / info page masthead: kicker, serif title, heavy rule. */
export default function PageTitle({
  title,
  kicker,
  meta,
  intro,
}: {
  title: React.ReactNode
  kicker?: string
  meta?: string
  intro?: string
}) {
  return (
    <header className="mb-7">
      {kicker && <div className="section-label mb-2">{kicker}</div>}
      <h1 className="headline headline-lg text-[30px] md:text-[38px]">{title}</h1>
      <div className="mt-3.5 flex items-baseline justify-between gap-4 border-t-2 border-[color:var(--rule)] pt-2.5">
        {meta ? (
          <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-muted)]">
            {meta}
          </span>
        ) : (
          <span />
        )}
      </div>
      {intro && <p className="st-deck mt-4 max-w-2xl text-[17px]">{intro}</p>}
    </header>
  )
}
