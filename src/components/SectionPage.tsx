import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'
import ArticleMeta from '@/components/ArticleMeta'
import {
  getArticlesBySection,
  getArticleImageSrc,
  getArticleSlug,
  articles,
  type Article,
} from '@/data/articles'

interface SectionPageProps {
  section: Article['section']
  title: string
  kicker?: string
}

const browseLinks = [
  { href: '/hot', label: 'Hot' },
  { href: '/newspaper', label: 'Politics' },
  { href: '/live', label: 'Live' },
  { href: '/opinion', label: 'Opinion' },
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/culture', label: 'Culture' },
  { href: '/sports', label: 'Sports' },
]

export default function SectionPage({ section, title, kicker }: SectionPageProps) {
  const sectionArticles = getArticlesBySection(section)
  const featured = sectionArticles[0]
  const rest = sectionArticles.slice(1)
  const count = sectionArticles.length

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb current={title} />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            {kicker && <div className="section-label mb-1">{kicker}</div>}
            <h1 className="font-display font-bold text-[26px] md:text-[32px] leading-tight text-[color:var(--text-primary)] pb-2 mb-4 border-b-[3px] border-[color:var(--rule)]">
              {title}
            </h1>
            <p className="text-[11px] font-sans uppercase tracking-[0.06em] text-[color:var(--text-muted)] mb-5">
              {count} {count === 1 ? 'story' : 'stories'} filed
            </p>

            {count === 0 ? (
              <div className="dr-card p-8 text-center">
                <h3 className="font-display font-bold text-[18px] text-[color:var(--text-primary)] mb-1">
                  Nothing on the wire yet
                </h3>
                <p className="text-[color:var(--text-secondary)] text-[13px]">
                  No stories filed in this section. Check back soon.
                </p>
              </div>
            ) : (
              <>
                {featured && (
                  <Link href={`/article/${getArticleSlug(featured)}`} className="block group">
                    <article className="pb-5 mb-5 border-b border-[color:var(--border-soft)]">
                      {getArticleImageSrc(featured.image) && (
                        <div className="aspect-[16/9] overflow-hidden bg-[color:var(--bg-secondary)] dr-media mb-3">
                          <img
                            src={getArticleImageSrc(featured.image)!}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="section-label mb-1.5">{featured.category}</div>
                      <h2 className="headline headline-lg text-[24px] md:text-[30px] mb-2 group-hover:underline">
                        {featured.title}
                      </h2>
                      <p className="font-serif text-[15px] text-[color:var(--text-secondary)] leading-[1.55] mb-2.5">
                        {featured.summary}
                      </p>
                      <ArticleMeta article={featured} />
                    </article>
                  </Link>
                )}

                <ul className="divide-y divide-[color:var(--border-soft)]">
                  {rest.map((article) => (
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
                          <div className="w-[110px] h-[82px] md:w-[132px] md:h-[98px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
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
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[300px] lg:shrink-0 lg:border-l lg:border-[color:var(--border-soft)] lg:pl-7">
            <div className="space-y-7">
              <section>
                <SectionHeading title="Trending Now" />
                <ol className="divide-y divide-[color:var(--border-soft)]">
                  {articles.slice(0, 6).map((a, index) => (
                    <li key={a.id}>
                      <Link
                        href={`/article/${getArticleSlug(a)}`}
                        className="flex gap-3 py-2.5 first:pt-0 group"
                      >
                        <span className="font-display font-bold text-[20px] tabular-nums leading-none w-6 shrink-0 text-[color:var(--text-primary)]">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="headline text-[13px] leading-snug group-hover:underline line-clamp-3 mb-1">
                            {a.title}
                          </h3>
                          <ArticleMeta article={a} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <SectionHeading title="Browse Sections" />
                <div className="flex flex-wrap gap-1.5">
                  {browseLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`dr-chip ${link.href === `/${section}` ? 'dr-chip-active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
