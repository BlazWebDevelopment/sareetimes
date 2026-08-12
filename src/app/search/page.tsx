'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'
import ArticleMeta from '@/components/ArticleMeta'
import { searchArticles, articles, getArticleImageSrc, getArticleSlug } from '@/data/articles'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const POPULAR_SEARCHES = [
  'Gemini',
  'AI',
  'Bitcoin',
  'Knicks',
  'NYC',
  'Yankees',
  'Memecoin',
  'OpenAI',
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? searchArticles(query) : []

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb current="Search" />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            <div className="section-label mb-1">Search</div>
            <h1 className="font-display font-bold text-[24px] md:text-[30px] leading-tight text-[color:var(--text-primary)] pb-2 border-b-[3px] border-[color:var(--rule)]">
              Results for &ldquo;{query}&rdquo;
            </h1>
            <p className="text-[11px] font-sans uppercase tracking-[0.06em] text-[color:var(--text-muted)] mt-2 mb-5">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>

            {results.length > 0 ? (
              <ul className="divide-y divide-[color:var(--border-soft)]">
                {results.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/article/${getArticleSlug(article)}`}
                      className="flex gap-4 py-4 first:pt-0 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="section-label mb-1">{article.category}</div>
                        <h3 className="headline text-[17px] leading-snug group-hover:underline mb-1.5 line-clamp-3">
                          {article.title}
                        </h3>
                        <p className="font-serif text-[13px] text-[color:var(--text-secondary)] leading-[1.5] line-clamp-2 mb-1.5">
                          {article.summary}
                        </p>
                        <ArticleMeta article={article} />
                      </div>
                      {getArticleImageSrc(article.image) ? (
                        <div className="w-[110px] h-[82px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
                          <img
                            src={getArticleImageSrc(article.image)!}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dr-card p-8 text-center">
                <h3 className="font-display font-bold text-[18px] text-[color:var(--text-primary)] mb-1">
                  No results
                </h3>
                <p className="text-[color:var(--text-secondary)] text-[13px]">
                  Try different keywords, or pick one of the popular searches.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:w-[300px] lg:shrink-0 lg:border-l lg:border-[color:var(--border-soft)] lg:pl-7">
            <div className="space-y-7">
              <section>
                <SectionHeading title="Popular Searches" />
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((term) => (
                    <Link
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className={`dr-chip ${
                        term.toLowerCase() === query.trim().toLowerCase() ? 'dr-chip-active' : ''
                      }`}
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading title="Trending Now" />
                <ol className="divide-y divide-[color:var(--border-soft)]">
                  {articles.slice(0, 6).map((article, index) => (
                    <li key={article.id}>
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="flex gap-3 py-2.5 first:pt-0 group"
                      >
                        <span className="font-display font-bold text-[20px] tabular-nums leading-none w-6 shrink-0 text-[color:var(--text-primary)]">
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
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-[13px] font-sans text-[color:var(--text-secondary)]">
          Loading…
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
