import { useMemo, useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components/common/States";
import { WidgetCard } from "../components/common/WidgetCard";
import { fetchWeatherByCity } from "../services/weatherService";
import type { WeatherData } from "../types/dashboard";
import { generateWeatherInsight } from "../utils/insights";

export function WeatherWidget() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSearch = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch {
      setError("City lookup failed. Try another location.");
    } finally {
      setLoading(false);
    }
  };

  const insight = useMemo(() => generateWeatherInsight(weather), [weather]);

  return (
    <WidgetCard
      title="Weather"
      description="Search weather by city"
      insight={insight}
    >
      <div className="flex gap-2">
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-950/80 dark:text-slate-100"
          placeholder="Enter city"
        />
        <button
          onClick={onSearch}
          className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500"
        >
          Search
        </button>
      </div>

      {loading && <LoadingState label="Loading weather..." />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && !weather && (
        <EmptyState message="Search a city to view weather." />
      )}
      {weather && !loading && (
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-gray-800 dark:bg-gray-950/60 dark:text-slate-300">
          <p>
            <span className="text-slate-500 dark:text-slate-400">City:</span>{" "}
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">
              {weather.city}
            </span>
          </p>
          <p>
            <span className="text-slate-500 dark:text-slate-400">
              Condition:
            </span>{" "}
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">
              {weather.condition}
            </span>
          </p>
          <p>
            <span className="text-slate-500 dark:text-slate-400">Temp:</span>{" "}
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">
              {weather.temperature} C
            </span>
          </p>
          <p>
            <span className="text-slate-500 dark:text-slate-400">
              Humidity:
            </span>{" "}
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">
              {weather.humidity}%
            </span>
          </p>
        </div>
      )}
    </WidgetCard>
  );
}
