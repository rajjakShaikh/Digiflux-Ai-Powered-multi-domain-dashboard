import { useEffect, useMemo, useState } from 'react'
import { EmptyState, ErrorState, LoadingState } from '../components/common/States'
import { WidgetCard } from '../components/common/WidgetCard'
import { fetchNews } from '../services/newsService'
import type { NewsArticle } from '../types/dashboard'
import { generateNewsInsight } from '../utils/insights'

const formatDate = (iso?: string) => {
  if (!iso) return 'Recently'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Recently'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function NewsWidget() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const loadNews = async () => {
      try {
        setLoading(true)
        const data = await fetchNews()
        if (mounted) setArticles(data)
      } catch {
        if (mounted) setError('Unable to load articles')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadNews()
    return () => {
      mounted = false
    }
  }, [])

  const insight = useMemo(() => generateNewsInsight(articles), [articles])

  return (
    <WidgetCard title="News" description="Latest domain headlines" insight={insight}>
      {loading && <LoadingState label="Loading articles..." />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && articles.length === 0 && <EmptyState message="No articles available." />}
      {!loading && !error && articles.length > 0 && (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li
              key={article.url}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-50 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:bg-gray-900/80"
            >
              <a href={article.url} target="_blank" rel="noreferrer" className="group flex gap-3">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-16 w-24 rounded-lg object-cover"
                    loading="lazy"
                  />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-bold leading-5 text-slate-900 transition-colors duration-300 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
                    {article.title}
                  </p>
                  <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">{article.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-indigo-600 dark:text-indigo-300">{article.source}</span>
                    <span className="text-slate-500 dark:text-slate-500">•</span>
                    <span className="text-slate-500 dark:text-slate-500">{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </WidgetCard>
  )
}
