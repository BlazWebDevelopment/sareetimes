import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/brand'

const sectionLinks = [
  { href: '/hot', label: 'Hot' },
  { href: '/newspaper', label: 'Politics' },
  { href: '/live', label: 'Live' },
  { href: '/opinion', label: 'Opinion' },
]

const categoryLinks = [
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/culture', label: 'Culture' },
  { href: '/sports', label: 'Sports' },
]

function LinkColumn({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="md:col-span-2">
      <h3 className="section-label mb-3 pb-1.5 border-b border-[color:var(--border-soft)]">
        {heading}
      </h3>
      <ul className="space-y-2 text-[13px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="dr-footer-slab mt-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-9">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-start gap-3 mb-3">
              <img
                src="/logo.png"
                alt=""
                width={38}
                height={38}
                className="w-[38px] h-[38px] dr-brand-mark"
              />
              <div>
                <span className="font-display font-bold text-[1.25rem] uppercase tracking-[0.02em] text-[color:var(--text-primary)] block leading-none">
                  {SITE_NAME}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                  Crisp headlines &middot; Layered coverage
                </span>
              </div>
            </div>
            <p className="text-[color:var(--text-secondary)] text-[13px] leading-relaxed max-w-sm">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <LinkColumn heading="Sections" links={sectionLinks} />
          <LinkColumn heading="Categories" links={categoryLinks} />

          <div id="newsletter" className="md:col-span-4 scroll-mt-6">
            <h3 className="section-label mb-3 pb-1.5 border-b border-[color:var(--border-soft)]">
              Morning briefing
            </h3>
            <p className="text-[color:var(--text-secondary)] text-[13px] mb-3">
              Five sharp headlines, every weekday morning. Free.
            </p>
            <NewsletterForm
              variant="inline"
              buttonLabel="Subscribe"
              placeholder="Your email address"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border-soft)] bg-[color:var(--bg-base)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] font-sans text-[color:var(--text-muted)]">
            <span>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/privacy" className="hover:text-[color:var(--text-primary)] hover:underline">
                Privacy
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/terms" className="hover:text-[color:var(--text-primary)] hover:underline">
                Terms
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/about" className="hover:text-[color:var(--text-primary)] hover:underline">
                About
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/help" className="hover:text-[color:var(--text-primary)] hover:underline">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
