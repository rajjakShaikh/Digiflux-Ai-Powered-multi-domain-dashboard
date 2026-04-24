import { useEffect, useState } from 'react'
import { storage } from '../utils/localStorage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => storage.get(key, initialValue))

  useEffect(() => {
    storage.set(key, value)
  }, [key, value])

  return [value, setValue] as const
}
