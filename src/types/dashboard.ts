export type WidgetType = 'finance' | 'health' | 'news' | 'weather' | 'aiChat'

export interface WidgetConfig {
  id: WidgetType
  title: string
  description: string
}

export interface FinancePoint {
  day: string
  spending: number
  income: number
}

export interface HealthMetrics {
  steps: number
  sleepHours: number
  caloriesBurned: number
}

export interface NewsArticle {
  title: string
  description: string
  url: string
  source: string
  imageUrl?: string
  publishedAt?: string
}

export interface WeatherData {
  city: string
  temperature: number
  condition: string
  humidity: number
  windKph: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}
