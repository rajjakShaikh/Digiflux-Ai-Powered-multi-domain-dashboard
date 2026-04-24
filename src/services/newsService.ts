import type { NewsArticle } from '../types/dashboard'

interface HnHit {
  title: string
  url: string | null
  story_url: string | null
  author: string
  created_at: string
}

interface HnResponse {
  hits: HnHit[]
}

interface SpaceflightArticle {
  title: string
  summary: string
  url: string
  image_url: string
  news_site: string
  published_at: string
}

const FALLBACK_NEWS: NewsArticle[] = [
  {
    title: 'AI copilots are reshaping software workflows',
    description: 'Engineering teams are blending AI assistance with stronger review loops.',
    url: 'https://example.com/ai-copilots',
    source: 'Tech Daily',
    imageUrl: 'https://picsum.photos/seed/ai-dashboard/200/120',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Fintech sees growth in real-time analytics',
    description: 'Dashboards with streaming insights drive faster decision making.',
    url: 'https://example.com/fintech-analytics',
    source: 'Market Wire',
    imageUrl: 'https://picsum.photos/seed/fin-dashboard/200/120',
    publishedAt: new Date().toISOString(),
  },
]

function normalizeFromHackerNews(data: HnResponse): NewsArticle[] {
  return data.hits
    .filter((hit) => Boolean(hit.title))
    .slice(0, 6)
    .map((hit) => ({
      title: hit.title,
      description: `By ${hit.author}`,
      url: hit.url ?? hit.story_url ?? 'https://news.ycombinator.com/',
      source: 'Hacker News',
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(hit.title)}/200/120`,
      publishedAt: hit.created_at,
    }))
}

function normalizeFromSpaceflight(data: SpaceflightArticle[]): NewsArticle[] {
  return data.slice(0, 6).map((article) => ({
    title: article.title,
    description: article.summary,
    url: article.url,
    source: article.news_site,
    imageUrl: article.image_url,
    publishedAt: article.published_at,
  }))
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const endpoint =
    import.meta.env.VITE_NEWS_API_URL ?? 'https://api.spaceflightnewsapi.net/v4/articles/?limit=6'

  try {
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error('Failed to fetch news')
    const data = await res.json()

    let normalized: NewsArticle[] = []
    if (Array.isArray(data?.results)) {
      normalized = normalizeFromSpaceflight(data.results as SpaceflightArticle[])
    } else if (Array.isArray(data?.hits)) {
      normalized = normalizeFromHackerNews(data as HnResponse)
    }

    return normalized.length ? normalized : FALLBACK_NEWS
  } catch {
    return FALLBACK_NEWS
  }
}
