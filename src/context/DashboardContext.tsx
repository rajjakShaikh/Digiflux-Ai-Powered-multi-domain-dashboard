import { useCallback, useMemo, useState } from 'react'
import { DEFAULT_WIDGET_ORDER } from '../constants/widgetConfig'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLiveSimulation } from '../hooks/useLiveSimulation'
import type { FinancePoint, HealthMetrics, WidgetType } from '../types/dashboard'
import { DashboardContext } from './dashboardContextStore'

const initialFinance: FinancePoint[] = [
  { day: 'Mon', spending: 180, income: 260 },
  { day: 'Tue', spending: 210, income: 270 },
  { day: 'Wed', spending: 170, income: 265 },
  { day: 'Thu', spending: 225, income: 280 },
  { day: 'Fri', spending: 240, income: 290 },
]

const initialHealth: HealthMetrics = {
  steps: 8200,
  sleepHours: 7.2,
  caloriesBurned: 580,
}

const randomize = (base: number, variance: number) =>
  Math.max(0, Math.round(base + (Math.random() * 2 - 1) * variance))

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [widgetOrder, setWidgetOrder] = useLocalStorage<WidgetType[]>('dashboard_widget_order', DEFAULT_WIDGET_ORDER)
  const [financeSeries, setFinanceSeries] = useState<FinancePoint[]>(initialFinance)
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>(initialHealth)

  const tick = useCallback(() => {
    setFinanceSeries((prev) => {
      const latest = prev[prev.length - 1]
      const next: FinancePoint = {
        day: latest.day,
        spending: randomize(latest.spending, 30),
        income: randomize(latest.income, 20),
      }
      return [...prev.slice(1), next]
    })

    setHealthMetrics((prev) => ({
      steps: randomize(prev.steps + 120, 180),
      sleepHours: Number((Math.max(5.8, Math.min(8.5, prev.sleepHours + (Math.random() - 0.5) * 0.3))).toFixed(1)),
      caloriesBurned: randomize(prev.caloriesBurned + 15, 35),
    }))
  }, [])

  useLiveSimulation(tick, 7000)

  const value = useMemo(
    () => ({
      widgetOrder,
      setWidgetOrder,
      financeSeries,
      healthMetrics,
    }),
    [financeSeries, healthMetrics, setWidgetOrder, widgetOrder],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
