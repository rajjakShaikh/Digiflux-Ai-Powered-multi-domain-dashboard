import { createContext } from 'react'
import type { FinancePoint, HealthMetrics, WidgetType } from '../types/dashboard'

export interface DashboardContextValue {
  widgetOrder: WidgetType[]
  setWidgetOrder: (order: WidgetType[]) => void
  financeSeries: FinancePoint[]
  healthMetrics: HealthMetrics
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)
