import { useEffect } from 'react'

export function useLiveSimulation(callback: () => void, intervalMs: number) {
  useEffect(() => {
    const id = window.setInterval(callback, intervalMs)
    return () => window.clearInterval(id)
  }, [callback, intervalMs])
}
