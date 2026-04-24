import { useContext } from 'react'
import { DashboardContext } from './dashboardContextStore'

export function useDashboardContext() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboardContext must be used within DashboardProvider')
  return ctx
}
