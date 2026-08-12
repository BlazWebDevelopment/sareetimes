'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import ArticleMeta from '@/components/ArticleMeta'
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
].join('  ·  ')

export default function Home() {
  const featuredArticle = articles[0]
  const isLeopoldFeatured = featuredArticle.id === '98437309'
  const subFeatured = articles.slice(1, 3)
  const topGrid = articles.slice(3, 9)
  const wireList = articles.slice(9, 16)
  const businessFeed = articles.filter((a) => a.section === 'finance').slice(0, 4)
  const techFeed = articles.filter((a) => a.section === 'tech').slice(0, 4)
  const sportsFeed = articles.filter((a) => a.section === 'sports').slice(0, 4)
  const cultureFeed = articles.filter((a) => a.section === 'culture').slice(0, 4)

  const renderModule = (title: string, href: string, items: Article[]) => (
    <section>
      <SectionHeading title={title} href={href} />
      <ul className="divide-y divide-[color:var(--border-soft)]">
        {items.map((a) => (
          <li key={a.id}>
            <Link href={`/article/${getArticleSlug(a)}`} className="flex gap-3 py-2.5 first:pt-0 group">
              <div className="flex-1 min-w-0">
                <h3 className="headline text-[14px] line-clamp-3 group-hover:underline mb-1">
                  {a.title}
                </h3>
                <ArticleMeta article={a} />
              </div>
              {getArticleImageSrc(a.image) ? (
                <div className="w-[70px] h-[52px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
                  <img
                    src={getArticleImageSrc(a.image)!}
                    alt=""
                    className="w-full h-full object-cover"
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

      {/* Breaking ticker */}
      <div className="dr-ticker-rail">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-1.5 flex items-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-sans uppercase tracking-[0.12em] text-white shrink-0 px-2 py-1 dr-live-pill bg-[color:var(--text-primary)]">
            <span className="w-1.5 h-1.5 bg-white live-dot" />
            Breaking
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker text-[12px] font-sans text-[color:var(--text-secondary)]">
              <span className="pr-10">{TICKER_HEADLINES}</span>
              <span className="pr-10" aria-hidden="true">
                {TICKER_HEADLINES}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Lead column */}
          <div className="lg:col-span-8 min-w-0">
            <SectionHeading title="Top Stories" />

            {/* Lead story */}
            <Link href={`/article/${getArticleSlug(featuredArticle)}`} className="block group">
              <article>
                <div className="aspect-[16/9] overflow-hidden bg-[color:var(--bg-secondary)] dr-media">
                  <img
                    src={getArticleImageSrc(featuredArticle.image) ?? FALLBACK_HERO_IMAGE}
                    alt=""
                    className={`w-full h-full ${
                      isLeopoldFeatured ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <div className="pt-3">
                  <div className="section-label mb-1.5">{featuredArticle.category}</div>
                  <h1 className="headline headline-lg text-[26px] md:text-[34px] mb-2 group-hover:underline">
                    {featuredArticle.title}
                  </h1>
                  <p className="font-serif text-[15px] text-[color:var(--text-secondary)] leading-[1.55] mb-2.5">
                    {featuredArticle.summary}
                  </p>
                  <ArticleMeta article={featuredArticle} />
                </div>
              </article>
            </Link>

            {/* Two-up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6 border-t border-[color:var(--border-soft)]">
              {subFeatured.map((a) => (
                <Link key={a.id} href={`/article/${getArticleSlug(a)}`} className="block group">
                  <article className="h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden bg-[color:var(--bg-secondary)] dr-thumb">
                      <img
                        src={getArticleImageSrc(a.image) ?? FALLBACK_HERO_IMAGE}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-2.5 flex flex-col flex-1">
                      <div className="section-label mb-1">{a.category}</div>
                      <h3 className="headline text-[17px] mb-1.5 group-hover:underline line-clamp-3">
                        {a.title}
                      </h3>
                      <p className="font-serif text-[13px] text-[color:var(--text-secondary)] leading-[1.5] line-clamp-2 mb-2">
                        {a.summary}
                      </p>
                      <div className="mt-auto">
                        <ArticleMeta article={a} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* More headlines */}
            <section className="mt-6 pt-6 border-t border-[color:var(--border-soft)]">
              <SectionHeading title="More Headlines" href="/hot" />
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-7">
                {topGrid.map((article, idx) => (
                  <Link
                    key={article.id}
                    href={`/article/${getArticleSlug(article)}`}
                    className={`flex gap-3 py-3 group border-t border-[color:var(--border-soft)] first:border-t-0 ${
                      idx === 1 ? 'md:border-t-0' : ''
                    } ${idx % 2 === 0 ? 'md:pr-7 md:border-r md:border-r-[color:var(--border-soft)]' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="section-label mb-1">{article.category}</div>
                      <h3 className="headline text-[14px] line-clamp-3 group-hover:underline mb-1">
                        {article.title}
                      </h3>
                      <ArticleMeta article={article} />
                    </div>
                    {getArticleImageSrc(article.image) ? (
                      <div className="w-[86px] h-[64px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
                        <img
                          src={getArticleImageSrc(article.image)!}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>

            {/* Section feeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[color:var(--border-soft)]">
              {renderModule('Business', '/finance', businessFeed)}
              {renderModule('Technology', '/tech', techFeed)}
              {renderModule('Sports', '/sports', sportsFeed)}
              {renderModule('Culture', '/culture', cultureFeed)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:border-l lg:border-[color:var(--border-soft)] lg:pl-7">
            <div className="space-y-7">
              <section>
                <SectionHeading title="Most Read · 24h" />
                <ol className="divide-y divide-[color:var(--border-soft)]">
                  {articles.slice(0, 6).map((article, index) => (
                    <li key={article.id}>
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="flex gap-3 py-2.5 first:pt-0 group"
                      >
                        <span className="font-display font-bold text-[20px] leading-none w-6 shrink-0 tabular-nums text-[color:var(--text-primary)]">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="headline text-[13px] leading-snug group-hover:underline line-clamp-3 mb-1">
                            {article.title}
                          </h3>
                          <ArticleMeta article={article} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <section
                id="newsletter"
                className="dr-card dr-newsletter-glow p-4 scroll-mt-6"
              >
                <h2 className="font-sans font-bold text-[13px] uppercase tracking-[0.1em] text-[color:var(--text-primary)] mb-1.5">
                  Morning Briefing
                </h2>
                <p className="text-[13px] font-sans text-[color:var(--text-secondary)] mb-3 leading-relaxed">
                  Five sharp headlines, every weekday morning. Free.
                </p>
                <NewsletterForm variant="stacked" buttonLabel="Subscribe" />
              </section>

              <section>
                <SectionHeading title="More From The Wire" />
                <ul className="divide-y divide-[color:var(--border-soft)]">
                  {wireList.map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="block py-2.5 first:pt-0 group"
                      >
                        <h3 className="headline text-[13px] leading-snug group-hover:underline line-clamp-2 mb-1">
                          {article.title}
                        </h3>
                        <ArticleMeta article={article} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
