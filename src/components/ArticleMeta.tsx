import type { Article } from '@/data/articles'
import { SITE_NAME } from '@/lib/brand'
import { relativeTime } from '@/lib/time'

export default function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-sans text-[color:var(--text-muted)] min-w-0">
      <span className="dr-kicker-mark flex items-center justify-center text-[8px] font-bold font-sans shrink-0">
        W
      </span>
      <span className="truncate">{article.byline ?? SITE_NAME}</span>
      <span aria-hidden="true">|</span>
      <span className="shrink-0">{relativeTime(article.date, article.time)}</span>
    </div>
  )
}
