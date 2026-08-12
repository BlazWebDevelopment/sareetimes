'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

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

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [today, setToday] = useState('')
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
        className={`shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-sans font-bold uppercase tracking-[0.06em] whitespace-nowrap border-b-[3px] -mb-px ${
          isActive
            ? 'text-[color:var(--text-primary)] border-[color:var(--rule)]'
            : 'text-[color:var(--text-secondary)] border-transparent hover:text-[color:var(--text-primary)] hover:underline'
        }`}
      >
        {item.live && (
          <span className="w-1.5 h-1.5 bg-[color:var(--text-primary)] live-dot" />
        )}
        <span>{item.label}</span>
      </Link>
    )
  }

  return (
    <header className="dr-header-slab">
      {/* Utility strip: dateline left, secondary links right */}
      <div className="border-b border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-8 text-[11px] font-sans text-[color:var(--text-muted)]">
            <span className="uppercase tracking-[0.06em]">{today || '\u00a0'}</span>
            <span className="hidden sm:flex items-center gap-3">
              <Link href="/about" className="hover:underline hover:text-[color:var(--text-primary)]">
                About
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/help" className="hover:underline hover:text-[color:var(--text-primary)]">
                Help
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/terms" className="hover:underline hover:text-[color:var(--text-primary)]">
                Terms
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="py-5 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="w-11 h-11 dr-brand-mark"
            />
            <span className="font-display font-bold text-[2.1rem] md:text-[2.75rem] leading-none uppercase tracking-[0.02em] text-[color:var(--text-primary)]">
              {SITE_NAME}
            </span>
          </Link>
          <span className="mt-2 text-[10px] font-sans uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            {SITE_TAGLINE}
          </span>
        </div>
      </div>

      {/* Section nav + desktop search */}
      <nav className="dr-nav-rail">
        <div className="max-w-[1200px] mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {navItems.map(renderItem)}
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center dr-search h-7 pl-2 pr-0 shrink-0"
            >
              <input
                type="text"
                placeholder="Search"
                aria-label={`Search ${SITE_NAME}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 bg-transparent text-[12px] font-sans text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none"
              />
              <button
                type="submit"
                className="h-full px-2 border-l border-[color:var(--border-strong)] bg-[color:var(--bg-surface-2)] text-[11px] font-sans font-bold uppercase text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile search */}
      <div className="lg:hidden border-b border-[color:var(--border-soft)] bg-[color:var(--bg-surface)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-2">
          <form onSubmit={handleSearch} className="flex items-center dr-search h-9 pl-2.5">
            <input
              type="text"
              placeholder={`Search ${SITE_NAME}`}
              aria-label={`Search ${SITE_NAME}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] font-sans text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="h-full px-3 border-l border-[color:var(--border-strong)] bg-[color:var(--bg-surface-2)] text-[11px] font-sans font-bold uppercase text-[color:var(--text-secondary)]"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
