'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import ArticleMeta, { shortByline } from '@/components/ArticleMeta'
import SectionHeading from '@/components/SectionHeading'
import { articles, getArticleImageSrc, getArticleSlug, type Article } from '@/data/articles'
import Link from 'next/link'

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80&auto=format&fit=crop'

const TICKER_HEADLINES = [
  'King Charles back in NYC after 19 years',
  'UAE leaves OPEC May 1',
  'Musk vs OpenAI trial opens in California',
  'Knicks roll Hawks 127–97, take 3–2 series lead',
  'Gemini wires AI agents into live crypto trading',
  'Apple unveils Vision Pro 2',
  'Fed cuts rates 50 basis points',
].join('   \u00b7   ')

/**
 * Vertical hairlines between grid cells. A 2-up at `sm` becomes a 4-up at `lg`,
 * so the rule sits on every even cell while narrow and on every cell but the
 * first once wide. Padding matches the grid gap so each rule stays centred.
 */
const COLUMN_RULE =
  'border-[color:var(--border-soft)] sm:even:border-l sm:even:pl-5 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0'

export default function Home() {
  const featuredArticle = articles[0]
  const isLeopoldFeatured = featuredArticle.id === '98437309'
  const subFeatured = articles.slice(1, 3)
  const latestWire = articles.slice(3, 10)
  const headlineRow = articles.slice(10, 14)
  const mostRead = articles.slice(0, 6)
  const opinionFeed = articles.filter((a) => a.section === 'opinion').slice(0, 3)
  const businessFeed = articles.filter((a) => a.section === 'finance').slice(0, 4)
  const techFeed = articles.filter((a) => a.section === 'tech').slice(0, 4)
  const sportsFeed = articles.filter((a) => a.section === 'sports').slice(0, 4)
  const cultureFeed = articles.filter((a) => a.section === 'culture').slice(0, 4)

  const renderModule = (title: string, href: string, items: Article[]) => (
    <section>
      <SectionHeading title={title} href={href} />
      <ul>
        {items.map((a, i) => (
          <li
            key={a.id}
            className={i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''}
          >
            <Link
              href={`/article/${getArticleSlug(a)}`}
              className="group flex gap-3 py-3 first:pt-0"
            >
              <div className="min-w-0 flex-1">
                <h3 className="headline mb-1.5 line-clamp-3 text-[14.5px] group-hover:text-[color:var(--accent)]">
                  {a.title}
                </h3>
                <ArticleMeta article={a} />
              </div>
              {getArticleImageSrc(a.image) ? (
                <div className="st-thumb h-[54px] w-[72px] shrink-0 overflow-hidden">
                  <img
                    src={getArticleImageSrc(a.image)!}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breaking rail */}
      <div className="st-ticker-rail">
        <div className="mx-auto flex max-w-broadsheet items-center gap-3 overflow-hidden px-4 py-2 md:px-6">
          <span className="st-live-pill inline-flex shrink-0 items-center gap-1.5 px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em]">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
            Breaking
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-ticker font-serif text-[13.5px] text-[color:var(--text-secondary)]">
              <span className="pr-12">{TICKER_HEADLINES}</span>
              <span className="pr-12" aria-hidden="true">
                {TICKER_HEADLINES}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-broadsheet px-4 py-7 md:px-6 md:py-9">
        {/* ---------- Above the fold: wire | lead | rail ---------- */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
          {/* Live wire */}
          <aside className="order-2 lg:order-1 lg:col-span-3 lg:pr-7">
            <SectionHeading title="The Latest" aside="Updated live" />
            <ul>
              {latestWire.map((a, i) => (
                <li
                  key={a.id}
                  className={i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''}
                >
                  <Link
                    href={`/article/${getArticleSlug(a)}`}
                    className="group block py-2.5 first:pt-0"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="shrink-0 font-sans text-[11px] font-bold tabular-nums text-[color:var(--accent)]">
                        {a.time}
                      </span>
                      <h3 className="headline line-clamp-3 text-[13.5px] leading-snug group-hover:text-[color:var(--accent)]">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <SectionHeading title="Opinion" href="/opinion" />
              <ul>
                {opinionFeed.map((a, i) => (
                  <li
                    key={a.id}
                    className={i > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''}
                  >
                    <Link
                      href={`/article/${getArticleSlug(a)}`}
                      className="group block py-3 first:pt-0"
                    >
                      <h3 className="headline mb-1.5 line-clamp-3 text-[14.5px] italic group-hover:text-[color:var(--accent)]">
                        {a.title}
                      </h3>
                      <span className="meta-line font-semibold uppercase tracking-[0.07em] text-[color:var(--text-secondary)]">
                        {shortByline(a.byline)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Lead story */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:border-l lg:border-[color:var(--border-soft)] lg:px-7">
            <Link href={`/article/${getArticleSlug(featuredArticle)}`} className="group block">
              <article>
                <div className="section-label mb-2">{featuredArticle.category}</div>
                <h1 className="headline headline-lg mb-3.5 text-[32px] sm:text-[40px] md:text-[46px] group-hover:text-[color:var(--accent)]">
                  {featuredArticle.title}
                </h1>
                <p className="st-deck mb-4 text-[17px]">{featuredArticle.summary}</p>
                <div className="st-media aspect-[16/9] overflow-hidden">
                  <img
                    src={getArticleImageSrc(featuredArticle.image) ?? FALLBACK_HERO_IMAGE}
                    alt=""
                    className={`h-full w-full ${
                      isLeopoldFeatured ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <div className="pt-3">
                  <ArticleMeta article={featuredArticle} />
                </div>
              </article>
            </Link>

            {/* Secondary stories */}
            <div className="mt-7 grid grid-cols-1 gap-7 border-t-2 border-[color:var(--rule)] pt-6 sm:grid-cols-2 sm:gap-0">
              {subFeatured.map((a, i) => (
                <Link
                  key={a.id}
                  href={`/article/${getArticleSlug(a)}`}
                  className={`group block ${
                    i === 1
                      ? 'sm:border-l sm:border-[color:var(--border-soft)] sm:pl-6'
                      : 'sm:pr-6'
                  }`}
                >
                  <article className="flex h-full flex-col">
                    <div className="st-thumb mb-2.5 aspect-[3/2] overflow-hidden">
                      <img
                        src={getArticleImageSrc(a.image) ?? FALLBACK_HERO_IMAGE}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="section-label mb-1.5">{a.category}</div>
                    <h3 className="headline mb-1.5 line-clamp-3 text-[18px] group-hover:text-[color:var(--accent)]">
                      {a.title}
                    </h3>
                    <p className="st-deck mb-2.5 line-clamp-3 text-[14px]">{a.summary}</p>
                    <div className="mt-auto">
                      <ArticleMeta article={a} />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Right rail */}
          <aside className="order-3 lg:col-span-3 lg:border-l lg:border-[color:var(--border-soft)] lg:pl-7">
            <div className="space-y-8">
              <section>
                <SectionHeading title="Most Read" aside="Past 24 hours" />
                <ol>
                  {mostRead.map((article, index) => (
                    <li
                      key={article.id}
                      className={
                        index > 0 ? 'border-t border-[color:var(--border-subtle)]' : ''
                      }
                    >
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="group flex gap-3 py-3 first:pt-0"
                      >
                        <span className="st-rank w-6 shrink-0 text-[26px]">{index + 1}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="headline mb-1 line-clamp-3 text-[13.5px] leading-snug group-hover:text-[color:var(--accent)]">
                            {article.title}
                          </h3>
                          <ArticleMeta article={article} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="newsletter" className="st-panel scroll-mt-24 p-5">
                <span className="st-eyebrow">Free newsletter</span>
                <h2 className="headline mb-2 mt-1.5 text-[20px]">Morning Briefing</h2>
                <p className="st-deck mb-4 text-[14px]">
                  Five sharp headlines, every weekday morning. No filler, no noise.
                </p>
                <NewsletterForm variant="stacked" buttonLabel="Subscribe" />
              </section>
            </div>
          </aside>
        </div>

        {/* ---------- More headlines ---------- */}
        <section className="mt-10 border-t-2 border-[color:var(--rule)] pt-6">
          <SectionHeading title="More Headlines" href="/hot" linkLabel="All top stories" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
            {headlineRow.map((article) => (
              <Link
                key={article.id}
                href={`/article/${getArticleSlug(article)}`}
                className={`group block ${COLUMN_RULE}`}
              >
                <article>
                  {getArticleImageSrc(article.image) ? (
                    <div className="st-thumb mb-2.5 aspect-[3/2] overflow-hidden">
                      <img
                        src={getArticleImageSrc(article.image)!}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="section-label mb-1.5">{article.category}</div>
                  <h3 className="headline mb-1.5 line-clamp-4 text-[15.5px] group-hover:text-[color:var(--accent)]">
                    {article.title}
                  </h3>
                  <ArticleMeta article={article} />
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- Section modules ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-8 border-t-2 border-[color:var(--rule)] pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
          {[
            { title: 'Business', href: '/finance', items: businessFeed },
            { title: 'Technology', href: '/tech', items: techFeed },
            { title: 'Sports', href: '/sports', items: sportsFeed },
            { title: 'Culture', href: '/culture', items: cultureFeed },
          ].map((module) => (
            <div key={module.href} className={COLUMN_RULE}>
              {renderModule(module.title, module.href, module.items)}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
