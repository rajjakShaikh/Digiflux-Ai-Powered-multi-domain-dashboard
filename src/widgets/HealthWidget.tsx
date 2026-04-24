import { MetricTile } from '../components/common/MetricTile'
import { WidgetCard } from '../components/common/WidgetCard'
import { useDashboardContext } from '../context/useDashboardContext'
import { generateHealthInsight } from '../utils/insights'

export function HealthWidget() {
  const { healthMetrics } = useDashboardContext()
  const stepProgress = Math.min((healthMetrics.steps / 10000) * 100, 100)
  const sleepProgress = Math.min((healthMetrics.sleepHours / 8) * 100, 100)
  const calorieProgress = Math.min((healthMetrics.caloriesBurned / 700) * 100, 100)

  return (
    <WidgetCard
      title="Health"
      description="Daily wellness metrics"
      insight={generateHealthInsight(healthMetrics)}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricTile label="Steps" value={healthMetrics.steps.toLocaleString()} />
        <MetricTile label="Sleep" value={`${healthMetrics.sleepHours.toFixed(1)} h`} />
        <MetricTile label="Calories" value={healthMetrics.caloriesBurned.toLocaleString()} />
      </div>
      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-gray-800 dark:bg-gray-950/50">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Step Goal</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.round(stepProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-300 dark:bg-gray-800">
            <div className="h-2 rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${stepProgress}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Sleep Goal</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.round(sleepProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-300 dark:bg-gray-800">
            <div className="h-2 rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${sleepProgress}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Calories Goal</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.round(calorieProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-300 dark:bg-gray-800">
            <div className="h-2 rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${calorieProgress}%` }} />
          </div>
        </div>
      </div>
    </WidgetCard>
  )
}
