import type { WeatherData } from '../types/dashboard'

interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
}

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  61: 'Rain',
  63: 'Rain',
  65: 'Heavy rain',
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const encoded = encodeURIComponent(city)
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=1`)
  if (!geoRes.ok) throw new Error('Unable to fetch location')
  const geoJson = await geoRes.json()
  const location = geoJson.results?.[0]
  if (!location) throw new Error('City not found')

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
  )
  if (!weatherRes.ok) throw new Error('Unable to fetch weather')
  const weatherJson = (await weatherRes.json()) as OpenMeteoResponse

  return {
    city: location.name,
    temperature: weatherJson.current.temperature_2m,
    condition: WEATHER_CODE_MAP[weatherJson.current.weather_code] ?? 'Moderate conditions',
    humidity: weatherJson.current.relative_humidity_2m,
    windKph: weatherJson.current.wind_speed_10m,
  }
}
