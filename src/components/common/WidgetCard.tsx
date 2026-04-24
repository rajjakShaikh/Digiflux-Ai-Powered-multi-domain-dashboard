import { memo, type ReactNode } from 'react'

interface WidgetCardProps {
  title: string
  description?: string
  insight?: string
  children: ReactNode
}

function WidgetCardComponent({ title, description, insight, children }: WidgetCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/20 dark:border-gray-800 dark:bg-gray-900/95">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h3>
          {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
      {insight && (
        <div className="mt-4 rounded-xl border border-indigo-400/40 bg-indigo-100/70 px-3 py-2 text-sm text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
          <p>
            <span className="mr-1">💡</span>
            <span className="font-semibold">AI Insight:</span> {insight}
          </p>
        </div>
      )}
    </article>
  )
}

export const WidgetCard = memo(WidgetCardComponent)
