'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SITE_NAME } from '@/lib/brand'
import { BrandMark, Wordmark } from './Logo'

type NavItem = {
  href: string
  label: string
  live?: boolean
}

const navItems: NavItem[] = [
  { href: '/', label: 'Top Stories' },
  { href: '/hot', label: 'Hot' },
  { href: '/live', label: 'Live', live: true },
  { href: '/newspaper', label: 'Politics' },
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/sports', label: 'Sports' },
  { href: '/culture', label: 'Culture' },
  { href: '/opinion', label: 'Opinion' },
]

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5.25" />
      <path d="M12.5 12.5 17 17" />
    </svg>
  )
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [today, setToday] = useState('')
  const [navPinned, setNavPinned] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Rendered on the client only so the printed date never mismatches the server.
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    )
  }, [])

  // The compact wordmark only earns its place once the masthead has scrolled off.
  useEffect(() => {
    const onScroll = () => setNavPinned(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const renderItem = (item: NavItem) => {
    const isActive = pathname === item.href
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={`-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 font-sans text-[12.5px] tracking-[0.02em] ${
          isActive
            ? 'border-[color:var(--accent)] font-bold text-[color:var(--accent)]'
            : 'border-transparent font-medium text-[color:var(--text-secondary)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-primary)]'
        }`}
      >
        {item.live && (
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-[color:var(--live)]" />
        )}
        <span>{item.label}</span>
      </Link>
    )
  }

  return (
    <header className="st-header-slab">
      {/* Utility rail: dateline left, secondary links right */}
      <div className="st-utility-rail">
        <div className="mx-auto max-w-broadsheet px-4 md:px-6">
          <div className="flex h-9 items-center justify-between font-sans text-[11px] text-[color:var(--text-muted)]">
            <span className="tracking-[0.08em] uppercase">{today || '\u00a0'}</span>
            <span className="hidden items-center gap-3 sm:flex">
              <Link href="/about" className="hover:text-[color:var(--accent)]">
                About
              </Link>
              <span className="text-[color:var(--border-strong)]" aria-hidden="true">
                &#124;
              </span>
              <Link href="/help" className="hover:text-[color:var(--accent)]">
                Help
              </Link>
              <span className="text-[color:var(--border-strong)]" aria-hidden="true">
                &#124;
              </span>
              <Link href="/terms" className="hover:text-[color:var(--accent)]">
                Terms
              </Link>
              <Link
                href="/#newsletter"
                className="st-btn-cta ml-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]"
              >
                Newsletter
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Masthead: mark and edition line flank a centred wordmark */}
      <div className="mx-auto max-w-broadsheet px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-4 py-6 md:grid-cols-[1fr_auto_1fr] md:py-8">
          <div className="hidden items-center gap-3 md:flex">
            <BrandMark size={42} />
            <span className="st-eyebrow leading-[1.5]">
              Est. 2008
              <br />
              The Daily Record
            </span>
          </div>

          <Link href="/" className="group flex flex-col items-center">
            <Wordmark className="text-[2.6rem] leading-none sm:text-[3.4rem] md:text-[4.25rem]" />
            <span className="mt-2.5 flex w-full items-center gap-3 md:mt-3">
              <span className="h-px flex-1 bg-[color:var(--border-soft)]" />
              <span className="st-eyebrow whitespace-nowrap">
                Reported with care &middot; Written to last
              </span>
              <span className="h-px flex-1 bg-[color:var(--border-soft)]" />
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="st-search hidden h-9 items-center justify-self-end pl-2.5 md:flex"
          >
            <SearchIcon className="h-4 w-4 text-[color:var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search"
              aria-label={`Search ${SITE_NAME}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 bg-transparent px-2 font-sans text-[12.5px] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none lg:w-40"
            />
            <button
              type="submit"
              className="h-full border-l border-[color:var(--border-strong)] bg-[color:var(--bg-surface)] px-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[color:var(--text-secondary)] hover:bg-[color:var(--accent)] hover:text-white"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Section nav, pinned once the masthead scrolls away */}
      <nav className="st-nav-rail st-sticky-rail" aria-label="Sections">
        <div className="mx-auto max-w-broadsheet px-2 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {navItems.map(renderItem)}
            </div>
            <Link
              href="/"
              aria-label={SITE_NAME}
              aria-hidden={!navPinned}
              tabIndex={navPinned ? undefined : -1}
              className={`hidden shrink-0 items-center gap-2 pl-4 transition-opacity duration-200 lg:flex ${
                navPinned ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <BrandMark size={22} />
              <span className="st-wordmark text-[16px]">{SITE_NAME}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile search */}
      <div className="border-b border-[color:var(--border-soft)] bg-[color:var(--bg-surface)] md:hidden">
        <div className="mx-auto max-w-broadsheet px-4 py-2.5">
          <form onSubmit={handleSearch} className="st-search flex h-10 items-center pl-2.5">
            <SearchIcon className="h-4 w-4 text-[color:var(--text-muted)]" />
            <input
              type="text"
              placeholder={`Search ${SITE_NAME}`}
              aria-label={`Search ${SITE_NAME}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-2 font-sans text-[13px] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="h-full border-l border-[color:var(--border-strong)] bg-[color:var(--bg-base)] px-3 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[color:var(--text-secondary)]"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
