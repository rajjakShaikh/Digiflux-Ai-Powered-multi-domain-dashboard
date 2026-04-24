import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { WidgetCard } from '../components/common/WidgetCard'
import { useDashboardContext } from '../context/useDashboardContext'
import { generateFinanceInsight } from '../utils/insights'

export function FinanceWidget() {
  const { financeSeries } = useDashboardContext()

  return (
    <WidgetCard
      title="Finance"
      description="Income vs spending trends"
      insight={generateFinanceInsight(financeSeries)}
    >
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={financeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="spending" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={financeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="income" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  )
}
