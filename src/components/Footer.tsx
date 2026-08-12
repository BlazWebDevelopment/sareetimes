import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import { BrandMark, Wordmark } from './Logo'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

const newsLinks = [
  { href: '/', label: 'Top Stories' },
  { href: '/hot', label: 'Hot' },
  { href: '/live', label: 'Live' },
  { href: '/newspaper', label: 'Politics' },
  { href: '/opinion', label: 'Opinion' },
]

const categoryLinks = [
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/culture', label: 'Culture' },
  { href: '/sports', label: 'Sports' },
  { href: '/search', label: 'Search' },
]

const companyLinks = [
  { href: '/about', label: 'About us' },
  { href: '/help', label: 'Help centre' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms of service' },
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
      <h3 className="section-label mb-3 border-b border-[color:var(--border-soft)] pb-2">
        {heading}
      </h3>
      <ul className="space-y-2.5 font-sans text-[13px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
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
    <footer className="st-footer-slab mt-14">
      <div className="mx-auto max-w-broadsheet px-4 py-10 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <BrandMark size={40} />
              <span className="flex flex-col">
                <Wordmark className="text-[1.6rem] leading-none" />
                <span className="st-eyebrow mt-1.5">{SITE_TAGLINE}</span>
              </span>
            </Link>
            <p className="max-w-sm font-serif text-[15px] leading-[1.6] text-[color:var(--text-secondary)]">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <LinkColumn heading="News" links={newsLinks} />
          <LinkColumn heading="Sections" links={categoryLinks} />

          <div id="newsletter" className="scroll-mt-24 md:col-span-4">
            <h3 className="section-label mb-3 border-b border-[color:var(--border-soft)] pb-2">
              Morning briefing
            </h3>
            <p className="mb-4 font-serif text-[15px] leading-[1.55] text-[color:var(--text-secondary)]">
              Five sharp headlines in your inbox every weekday morning. Free, and no
              filler.
            </p>
            <NewsletterForm
              variant="inline"
              buttonLabel="Subscribe"
              placeholder="Your email address"
            />
            <ul className="mt-6 space-y-2.5 font-sans text-[13px]">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border-soft)] bg-[color:var(--bg-base)]">
        <div className="mx-auto max-w-broadsheet px-4 py-5 md:px-6">
          <div className="flex flex-col items-center justify-between gap-3 font-sans text-[11.5px] text-[color:var(--text-muted)] md:flex-row">
            <span>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/privacy" className="hover:text-[color:var(--accent)]">
                Privacy
              </Link>
              <span className="text-[color:var(--border-strong)]" aria-hidden="true">
                &#124;
              </span>
              <Link href="/terms" className="hover:text-[color:var(--accent)]">
                Terms
              </Link>
              <span className="text-[color:var(--border-strong)]" aria-hidden="true">
                &#124;
              </span>
              <Link href="/about" className="hover:text-[color:var(--accent)]">
                About
              </Link>
              <span className="text-[color:var(--border-strong)]" aria-hidden="true">
                &#124;
              </span>
              <Link href="/help" className="hover:text-[color:var(--accent)]">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
