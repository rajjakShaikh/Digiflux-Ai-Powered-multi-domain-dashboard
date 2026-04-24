export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
}

export function ErrorState({ message }: { message: string }) {
  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
}

export function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
}
