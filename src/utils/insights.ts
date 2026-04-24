import type { FinancePoint, HealthMetrics, NewsArticle, WeatherData } from '../types/dashboard'

export const generateFinanceInsight = (points: FinancePoint[]) => {
  if (points.length < 2) return 'Add more finance data to generate insights.'
  const previous = points[points.length - 2].spending
  const current = points[points.length - 1].spending
  const trend = ((current - previous) / Math.max(previous, 1)) * 100
  if (trend > 10) return `Spending increased ${trend.toFixed(0)}% versus yesterday.`
  if (trend < -10) return `Great job: spending dropped ${Math.abs(trend).toFixed(0)}% versus yesterday.`
  return 'Spending remains stable this week.'
}

export const generateHealthInsight = (metrics: HealthMetrics) => {
  if (metrics.sleepHours < 7) return 'Sleep is trending low. Target at least 7 hours tonight.'
  if (metrics.steps < 8000) return 'Daily movement is below target; add a short evening walk.'
  return 'Health metrics look balanced today.'
}

export const generateNewsInsight = (articles: NewsArticle[]) => {
  if (articles.length === 0) return 'No news articles available at the moment.'
  return `Top source currently: ${articles[0].source}. Headlines are updating in near real-time.`
}

export const generateWeatherInsight = (weather: WeatherData | null) => {
  if (!weather) return 'Search for a city to get weather guidance.'
  if (weather.temperature > 32) return 'High temperature alert: hydrate and limit peak-hour outdoor activity.'
  if (weather.condition.toLowerCase().includes('rain')) return 'Rain expected. Carry an umbrella for commute windows.'
  return 'Weather conditions are comfortable for regular activity.'
}
