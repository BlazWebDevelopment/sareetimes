import type { Metadata } from 'next'
import { getArticleBySlug, getArticleImageSrc, getArticleSlug } from '@/data/articles'
import { SITE_NAME } from '@/lib/brand'
import ArticleView from './ArticleView'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: `Article not found — ${SITE_NAME}` }

  const url = `/article/${getArticleSlug(article)}`
  const image = getArticleImageSrc(article.image) ?? '/og-image.png'
  const publishedTime = article.date ? `${article.date}T${article.time || '00:00'}:00` : undefined

  return {
    title: `${article.title} — ${SITE_NAME}`,
    description: article.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      url,
      title: article.title,
      description: article.summary,
      publishedTime,
      section: article.category,
      authors: article.byline ? [article.byline] : undefined,
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [{ url: image, alt: article.title }],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleView params={params} />
}
