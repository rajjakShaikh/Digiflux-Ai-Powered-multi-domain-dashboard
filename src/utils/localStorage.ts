export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Avoid crashing app if storage quota is exceeded.
    }
  },
}
