import { useEffect, useMemo } from 'react'
import { DashboardGrid } from '../components/dashboard/DashboardGrid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AIChatWidget, FinanceWidget, HealthWidget, NewsWidget, WeatherWidget } from '../widgets'

export function DashboardPage() {
  const [isDark, setIsDark] = useLocalStorage('dashboard_theme_dark', true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const widgets = useMemo(
    () => ({
      finance: <FinanceWidget />,
      health: <HealthWidget />,
      news: <NewsWidget />,
      weather: <WeatherWidget />,
      aiChat: <AIChatWidget />,
    }),
    [],
  )

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 transition-colors duration-300 dark:bg-[#0B0F19] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">AI-Powered Multi-Domain Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Drag widgets to reorder. Layout is automatically persisted locally.
            </p>
          </div>
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-400 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <DashboardGrid widgets={widgets} />
      </div>
    </main>
  )
}
