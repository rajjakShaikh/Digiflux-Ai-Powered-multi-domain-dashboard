import type { WidgetConfig } from '../types/dashboard'

export const DEFAULT_WIDGET_ORDER: WidgetConfig['id'][] = [
  'finance',
  'health',
  'news',
  'weather',
  'aiChat',
]

export const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: 'finance',
    title: 'Finance',
    description: 'Cash flow and spending trends',
  },
  {
    id: 'health',
    title: 'Health',
    description: 'Daily wellness metrics',
  },
  {
    id: 'news',
    title: 'News',
    description: 'Latest headlines by domain',
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'City weather snapshot',
  },
  {
    id: 'aiChat',
    title: 'AI Chat',
    description: 'Quick conversational assistant',
  },
]
