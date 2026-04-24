interface MetricTileProps {
  label: string
  value: string
}

export function MetricTile({ label, value }: MetricTileProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-indigo-500/40 dark:border-gray-800 dark:bg-gray-950/70">
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  )
}
