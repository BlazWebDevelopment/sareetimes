'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'
import ArticleMeta from '@/components/ArticleMeta'
import ShareBar from '@/components/ShareBar'
import { getArticleBySlug, getArticleSlug, getArticleImageSrc, articles } from '@/data/articles'
import { SITE_NAME } from '@/lib/brand'
import Link from 'next/link'

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80&auto=format&fit=crop'

const BROWSE_LINKS = [
  { href: '/hot', label: 'Hot' },
  { href: '/newspaper', label: 'Politics' },
  { href: '/live', label: 'Live' },
  { href: '/opinion', label: 'Opinion' },
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/culture', label: 'Culture' },
  { href: '/sports', label: 'Sports' },
]

interface ArticlePageProps {
  params: {
    slug: string
  }
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="headline headline-lg text-[26px] md:text-[36px] mb-3 leading-tight">
      {children}
    </h1>
  )
}

function Byline({ author, facts }: { author: string; facts: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-sans text-[color:var(--text-muted)] mb-5 pb-3 border-b border-[color:var(--border-soft)]">
      <span className="flex items-center gap-2">
        <span className="dr-avatar-cut bg-[color:var(--text-primary)] flex items-center justify-center text-[9px] font-bold font-sans text-white">
          W
        </span>
        <span className="font-bold text-[color:var(--text-primary)]">By {author}</span>
      </span>
      {facts.map((fact) => (
        <span key={fact} className="flex items-center gap-2">
          <span aria-hidden="true">|</span>
          <span>{fact}</span>
        </span>
      ))}
    </div>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="text-[11px] font-sans text-[color:var(--text-muted)] mt-1.5 pt-1.5 border-t border-[color:var(--border-subtle)]">
      {children}
    </figcaption>
  )
}

/** Grey sidebar-style box used for explainers and takeaway lists. */
function InsetPanel({
  heading,
  children,
}: {
  heading?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-[color:var(--bg-surface)] border border-[color:var(--border-soft)] border-l-4 border-l-[color:var(--text-primary)] p-4 my-5 dr-pull-end">
      {heading && (
        <h3 className="font-sans font-bold text-[12px] uppercase tracking-[0.08em] text-[color:var(--text-primary)] mb-2">
          {heading}
        </h3>
      )}
      <div className="text-[14px] font-sans leading-[1.6] text-[color:var(--text-secondary)] [&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  )
}

function SourceLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="dr-disclaimer p-3 mt-6 text-[12px] font-sans text-[color:var(--text-muted)] leading-relaxed">
      {children}
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-6 pt-4 border-t border-[color:var(--border-soft)]">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="section-label mr-1">Tags</span>
        {tags.map((tag) => (
          <span key={tag} className="dr-chip">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  const articleImageSrc = getArticleImageSrc(article?.image)

  const isFeaturedArticle = article?.id === '98437239'
  const isBoomerArticle = article?.id === '98437267'

  const relatedArticles = articles.filter((a) => a.id !== article?.id).slice(0, 5)
  const moreFromSection = article
    ? articles.filter((a) => a.id !== article.id && a.section === article.section).slice(0, 4)
    : []

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb trail={[{ href: '/hot', label: 'Hot' }]} current={article?.category ?? 'Article'} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-8">
          <main className="flex-1 min-w-0">
            <article>
              {isFeaturedArticle ? (
                <>
                  <div className="mb-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="dr-chip dr-chip-active">Crypto</span>
                    <span className="dr-chip">AI Agent</span>
                    <span className="dr-chip">Gemini</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 dr-live-pill bg-[color:var(--text-primary)] text-white text-[10px] font-sans font-bold uppercase tracking-[0.08em]">
                      <span className="w-1.5 h-1.5 bg-white live-dot" />
                      Live · Apr 27, 2026
                    </span>
                  </div>

                  <Headline>
                    Gemini Rolls Out &ldquo;Agentic Trading&rdquo;: Let ChatGPT, Claude — and
                    Even Meme Agents — Directly Trade Your Crypto Account
                  </Headline>

                  <Byline
                    author="Wafer News Crypto Desk"
                    facts={['Apr 27, 2026 · 16:05', '1,284 reads', '92 comments']}
                  />

                  <figure className="mb-5">
                    <img
                      src={articleImageSrc ?? FALLBACK_HERO_IMAGE}
                      alt="AI agent connected to a live crypto trading dashboard"
                      className="w-full h-auto dr-media object-cover"
                    />
                    <Caption>
                      Illustrative: Gemini&apos;s new &ldquo;Agentic Trading&rdquo; panel lets a
                      &ldquo;My Trading Agent&rdquo; and a dedicated &ldquo;Meme Agent&rdquo; trade
                      under granular, user-defined permissions.
                    </Caption>
                  </figure>

                  <div className="article-content">
                    <p className="text-[18px] font-bold text-[color:var(--text-primary)]">
                      Gemini today rolled out &ldquo;Agentic Trading,&rdquo; a new product that
                      wires AI models like ChatGPT and Claude directly into your crypto account.
                      Going live on April 27, 2026, the feature uses Anthropic&apos;s open Model
                      Context Protocol (MCP) to let an authorized AI agent monitor markets, place
                      trades, and manage risk under preset rules. Gemini calls it &ldquo;the first
                      agentic trading tool to be available directly through a regulated US-based
                      exchange.&rdquo;
                    </p>

                    <p>
                      The flow is simple: pick the agent you trust, set permissions, then review
                      and connect. The new dashboard exposes a three-step &ldquo;Connect.
                      Authorize. Automate.&rdquo; path, with granular toggles for what an agent
                      can actually do — view balances, view order history, place orders, edit
                      orders, and (off by default) withdraw funds. Users can pause, edit, or
                      revoke access at any time.
                    </p>

                    <InsetPanel heading="How it works under the hood">
                      <p>
                        Gemini has wired its full trading API into the MCP standard. Supported
                        models can request market data and call trading functions through that
                        bridge, then act inside the limits a user has set. The exchange also
                        shipped &ldquo;Trading Skills&rdquo; — modular functions an agent can
                        invoke, including &ldquo;Find the Spread&rdquo; (current bid-ask for any
                        pair) and &ldquo;Retrieve Candles&rdquo; (historical OHLC data for pattern
                        checks and backtesting). More skills are planned.
                      </p>
                    </InsetPanel>

                    <h2>Meet the Meme Agent: AI that trades the trend for you</h2>

                    <p>
                      Alongside a generic &ldquo;My Trading Agent,&rdquo; Gemini&apos;s
                      connected-agents list now showcases a dedicated Meme Agent — a purpose-built
                      AI for the messy, fast-moving memecoin corner of crypto. The pitch is
                      honest: most retail traders cannot watch X, Telegram and on-chain feeds at
                      3 a.m., but an agent can. With your rules, a Meme Agent can flag trending
                      tokens, evaluate liquidity, size in small, set a hard stop, and bail when
                      momentum dies.
                    </p>

                    <p>
                      In the official screenshot, &ldquo;Meme Agent&rdquo; sits right below
                      &ldquo;My Trading Agent&rdquo; in the Connected Agents panel — both showing
                      as Active, both labeled with last activity timestamps. The implication is
                      clear: agents are no longer one-size-fits-all. You can run a conservative
                      agent on your spot account and a tightly-leashed Meme Agent on a separate
                      sub-balance for memecoin trades, each with its own permissions.
                    </p>

                    <InsetPanel heading="What a Meme Agent can do for you">
                      <ul>
                        <li>Watch trending tickers across social and on-chain signals 24/7</li>
                        <li>Use &ldquo;Find the Spread&rdquo; before sizing — skip illiquid traps</li>
                        <li>Backtest patterns with &ldquo;Retrieve Candles&rdquo; before going live</li>
                        <li>Place orders only inside the position size and max-loss you set</li>
                        <li>Auto-exit on stop-loss, take-profit, or momentum reversal</li>
                      </ul>
                    </InsetPanel>

                    <h2>You stay in control</h2>

                    <p>
                      Gemini is leaning hard into the &ldquo;secure by design / always in
                      control&rdquo; framing. The Agent Permissions sidebar shows exactly which
                      capabilities are on (view balances, view order history, place orders, edit
                      orders) and which are off (withdraw funds is blocked by default). A
                      persistent footer reminds users: &ldquo;You can pause or revoke access at
                      any time.&rdquo;
                    </p>

                    <p>
                      That matters because Agentic Trading lands during a wider push to give AI
                      agents real hands on real systems. Coinbase has backed x402 (an open
                      payments standard for AI bots, now under the Linux Foundation), and Tempo
                      is building MPP for machine-to-machine payments — both also use MCP.
                      Gemini&apos;s difference is that it brings agentic AI directly inside a
                      regulated exchange, not a wallet wrapper.
                    </p>

                    <h2>Limits, safety, and what the agent should not do</h2>

                    <p>
                      Letting an AI place real trades raises real questions: How do you stop a
                      model from chasing pumps? How do you cap a bad day? Gemini&apos;s answer is
                      the permissions UI plus Trading Skills that force the agent to look at
                      spreads and history before acting. Withdrawals being off by default is the
                      most important safety rail — even if the model is jailbroken or
                      hallucinates, it cannot drain the account.
                    </p>

                    <p>
                      Gemini frames the launch as the start of a category, not a one-off feature:
                      &ldquo;Agentic trading isn&apos;t just a feature.&rdquo; Expect more Trading
                      Skills, more agent templates (a Meme Agent today, perhaps a DCA Agent or
                      Hedging Agent tomorrow), and tighter MCP integrations with leading models.
                    </p>

                    <h2>Key takeaways</h2>

                    <InsetPanel>
                      <ul>
                        <li>
                          Gemini&apos;s Agentic Trading is live as of April 27, 2026 — AI models
                          like ChatGPT and Claude can connect via MCP to monitor markets and
                          trade.
                        </li>
                        <li>
                          A dedicated Meme Agent template is featured in Connected Agents —
                          purpose-built for memecoin trading with strict, user-set limits.
                        </li>
                        <li>
                          Gemini ships &ldquo;Trading Skills&rdquo; like Find the Spread and
                          Retrieve Candles, with more on the way.
                        </li>
                        <li>
                          Withdrawals are off by default; users can pause, edit or revoke any
                          agent at any time.
                        </li>
                      </ul>
                    </InsetPanel>

                    <SourceLine>
                      <strong className="text-[color:var(--text-primary)]">Reporter:</strong>{' '}
                      Wafer News Crypto Desk |{' '}
                      <strong className="text-[color:var(--text-primary)]">Editor:</strong> Marcus
                      Chen |{' '}
                      <strong className="text-[color:var(--text-primary)]">Source:</strong>{' '}
                      Gemini, The Block, MoneyCheck |{' '}
                      <strong className="text-[color:var(--text-primary)]">Reviewer:</strong>{' '}
                      David Park
                    </SourceLine>
                  </div>

                  <Tags
                    tags={[
                      '#Gemini',
                      '#AgenticTrading',
                      '#MemeAgent',
                      '#MCP',
                      '#ChatGPT',
                      '#Claude',
                      '#Crypto',
                    ]}
                  />
                </>
              ) : isBoomerArticle ? (
                <>
                  <div className="mb-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="dr-chip dr-chip-active">ETF Concept</span>
                    <span className="dr-chip">50+ Thesis</span>
                    <span className="dr-chip">BOOMER</span>
                  </div>

                  <Headline>
                    Meet BOOMER: A VanEck &ldquo;Old People ETF&rdquo; Concept Built for Investors
                    50+
                  </Headline>

                  <Byline author="Wafer News Finance Desk" facts={['Apr 16, 2026 · 09:45']} />

                  <div className="article-content">
                    <p className="text-[18px] font-bold text-[color:var(--text-primary)]">
                      GENZ asks a sharp question: if digital natives are reshaping spending and
                      risk habits, why not build an ETF around them? The GENZ idea targets Gen Z
                      and younger millennials who live their financial lives online, across
                      segments like &ldquo;Millennial Finance,&rdquo; the &ldquo;Gig
                      Economy,&rdquo; and digital sports betting.
                    </p>

                    <p>
                      BOOMER turns that premise on its head. This article is fictional and
                      satirical: it imagines a &ldquo;VanEck Old People ETF&rdquo; where the
                      beneficiaries are people 50 and up. Instead of investing in youth-first
                      disruption, BOOMER asks what happens when the theme is centered on
                      accumulated wealth, more mature spending patterns, and the way investors
                      typically allocate risk after age 50.
                    </p>

                    <InsetPanel heading="How BOOMER would “find” the 50+ names">
                      <p>
                        In this thought experiment, &ldquo;old people ETF&rdquo; does not mean
                        buying companies because they have pension plans. It means weighting
                        constituents toward companies expected to benefit from the 50+ cohort as
                        customers — and (in this playful methodology) toward companies whose
                        shareholder/customer profile is skewed toward investors aged 50+. In
                        short: BOOMER imagines an index with a demographic tilt, then rebalances
                        to keep the theme consistent.
                      </p>
                    </InsetPanel>

                    <h2>What BOOMER could invest in</h2>

                    <InsetPanel>
                      <ul>
                        <li>
                          50+ Digital Access: accessibility-first platforms that help older users
                          shop, manage accounts, and access services online.
                        </li>
                        <li>
                          Care &amp; Outcomes: health management, care coordination, and
                          &ldquo;aging well&rdquo; services and tools.
                        </li>
                        <li>
                          Retirement &amp; Risk Navigation: brokerage, advisory, and fintech
                          infrastructure that turns risk into plain language.
                        </li>
                      </ul>
                    </InsetPanel>

                    <h2>Limits &amp; safety (because demographics can drift)</h2>

                    <p>
                      Even if the thesis sounds clean, demographic themes can change fast. Health
                      outcomes evolve, technology adoption among older users can accelerate or
                      slow, and a real implementation would struggle to measure &ldquo;who holds
                      the stock&rdquo; reliably. The safer design always includes diversification
                      and transparent risk controls.
                    </p>

                    <h2>Key takeaways</h2>

                    <InsetPanel>
                      <ul>
                        <li>GENZ frames the market around digital native consumers; BOOMER flips the lens to 50+.</li>
                        <li>In this fictional methodology, the &ldquo;50+ holder&rdquo; idea is a demographic tilt, not a magic rule.</li>
                        <li>Themes guide the story, but risk controls decide the outcome.</li>
                      </ul>
                    </InsetPanel>

                    <SourceLine>
                      <strong className="text-[color:var(--text-primary)]">Reporter:</strong>{' '}
                      Wafer News Finance Desk |{' '}
                      <strong className="text-[color:var(--text-primary)]">Source:</strong> GENZ
                      theme inspiration (fictional BOOMER rewrite)
                    </SourceLine>
                  </div>

                  <Tags tags={['#BOOMER', '#VanEck', '#ETF', '#50Plus', '#Demographics']} />
                </>
              ) : article ? (
                <>
                  <div className="mb-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="dr-chip dr-chip-active">{article.category}</span>
                    {article.section.toLowerCase() !== article.category.toLowerCase() && (
                      <span className="dr-chip capitalize">{article.section}</span>
                    )}
                  </div>

                  <Headline>{article.title}</Headline>

                  <Byline
                    author={article.byline ?? 'Wafer News Staff'}
                    facts={[
                      `${article.date ?? '2026-04-29'} · ${article.time}`,
                      `${((parseInt(article.id.slice(-4), 10) * 7) % 3500) + 320} reads`,
                    ]}
                  />

                  {articleImageSrc ? (
                    <figure className="mb-5">
                      <img
                        src={articleImageSrc}
                        alt={article.title}
                        className="mx-auto h-auto w-auto max-w-full max-h-[440px] dr-media object-contain"
                      />
                      <Caption>{article.title} — Wafer News file image.</Caption>
                    </figure>
                  ) : null}

                  <div className="article-content">
                    <p className="text-[18px] font-bold text-[color:var(--text-primary)]">
                      {article.summary}
                    </p>

                    {article.body.length > 0 ? (
                      article.body.map((block, idx) => {
                        if (typeof block === 'string') {
                          return <p key={idx}>{block}</p>
                        }
                        if (block.type === 'heading') {
                          return <h2 key={idx}>{block.text}</h2>
                        }
                        if (block.type === 'list') {
                          return (
                            <ul key={idx} className="list-disc pl-5 mb-5 space-y-1.5">
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )
                        }
                        if (block.type === 'image') {
                          return (
                            <figure key={idx} className="my-6">
                              <img
                                src={getArticleImageSrc(block.src) ?? ''}
                                alt={block.alt ?? block.caption ?? ''}
                                className="w-full h-auto dr-media object-cover"
                              />
                              {block.caption ? <Caption>{block.caption}</Caption> : null}
                            </figure>
                          )
                        }
                        return (
                          <figure key={idx} className="my-6">
                            <div className="relative w-full aspect-video bg-black dr-media overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${block.videoId}`}
                                title={block.title ?? block.caption ?? 'Embedded video'}
                                className="absolute inset-0 w-full h-full"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                            {block.caption ? <Caption>{block.caption}</Caption> : null}
                          </figure>
                        )
                      })
                    ) : (
                      <p className="italic">
                        More from this story is being filed by the desk. Check back shortly.
                      </p>
                    )}

                    <SourceLine>
                      <strong className="text-[color:var(--text-primary)]">Reporter:</strong>{' '}
                      {article.byline ?? 'Wafer News Staff'} |{' '}
                      <strong className="text-[color:var(--text-primary)]">Section:</strong>{' '}
                      {article.section.toUpperCase()} |{' '}
                      <strong className="text-[color:var(--text-primary)]">Source:</strong>{' '}
                      {SITE_NAME}
                    </SourceLine>
                  </div>

                  <Tags
                    tags={[
                      `#${article.category.replace(/\s+/g, '')}`,
                      `#${article.section}`,
                      '#WaferNews',
                    ]}
                  />
                </>
              ) : (
                <>
                  <Headline>Article not found</Headline>
                  <p className="font-serif text-[15px] text-[color:var(--text-secondary)] leading-[1.6]">
                    Sorry, the story you&apos;re looking for has either been moved or never
                    existed. Head back to the{' '}
                    <Link href="/" className="text-[color:var(--accent)] underline">
                      front page
                    </Link>{' '}
                    for today&apos;s headlines.
                  </p>
                </>
              )}

              <div className="mt-6 pt-3 border-t border-[color:var(--border-soft)] text-[11px] font-sans text-[color:var(--text-muted)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>Article ID: {article?.id ?? params.slug}</span>
                <span>&copy; {new Date().getFullYear()} {SITE_NAME}.</span>
              </div>
            </article>

            <div className="mt-6">
              <SectionHeading title="Share This Article" />
              <ShareBar title={article?.title ?? SITE_NAME} />
            </div>

            {moreFromSection.length > 0 && (
              <section className="mt-7">
                <SectionHeading title={`More In ${article?.section ?? ''}`} />
                <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-7">
                  {moreFromSection.map((a, idx) => (
                    <li key={a.id}>
                      <Link
                        href={`/article/${getArticleSlug(a)}`}
                        className={`flex gap-3 py-3 group border-t border-[color:var(--border-soft)] ${
                          idx === 0 ? 'border-t-0' : ''
                        } ${idx === 1 ? 'md:border-t-0' : ''}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="section-label mb-1">{a.category}</div>
                          <h3 className="headline text-[14px] line-clamp-3 group-hover:underline mb-1">
                            {a.title}
                          </h3>
                          <ArticleMeta article={a} />
                        </div>
                        {getArticleImageSrc(a.image) ? (
                          <div className="w-[86px] h-[64px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
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
            )}
          </main>

          <aside className="hidden xl:block w-[300px] flex-shrink-0 border-l border-[color:var(--border-soft)] pl-7">
            <div className="space-y-7">
              <section>
                <SectionHeading title="Trending Now" />
                <ol className="divide-y divide-[color:var(--border-soft)]">
                  {relatedArticles.map((a, index) => (
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
                  {BROWSE_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="dr-chip">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
