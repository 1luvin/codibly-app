'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ForecastResponseDto, WeeklySummaryResponseDto } from '@/types/forecast';
import { api } from '@/services/api';
import ForecastTable from '@/components/ForecastTable';
import WeeklySummary from '@/components/WeeklySummary';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function HomePage() {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [forecast, setForecast] = useState<ForecastResponseDto[]>([]);
  const [summary, setSummary] = useState<WeeklySummaryResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  // Try to detect location on initial load
  useEffect(() => {
    if (!lat || !lon) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLon(pos.coords.longitude);
        },
        () => {
          console.warn('Could not retrieve geolocation');
        }
      );
    }
  }, []);

  // Fetch forecast and summary data when position is set
  useEffect(() => {
    if (lat != null && lon != null) {
      setLoading(true);

      Promise.all([
        api.get<ForecastResponseDto[]>('/forecast/weekly', { params: { lat, lon } }),
        api.get<WeeklySummaryResponseDto>('/forecast/summary/weekly', { params: { lat, lon } }),
      ])
        .then(([forecastRes, summaryRes]) => {
          setForecast(forecastRes.data);
          setSummary(summaryRes.data);
        })
        .catch((error) => {
          console.error('Error fetching forecast data:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [lat, lon]);

  return (
    <main className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Weekly Weather Forecast</h1>

      <MapPicker
        onPick={(lat, lon) => {
          setLat(lat);
          setLon(lon);
        }}
      />

      {loading && <p className="text-center text-gray-600">Loading weather data...</p>}

      {!loading && forecast.length > 0 && (
        <>
          <ForecastTable forecast={forecast}/>
          {summary && <WeeklySummary summary={summary}/>}
        </>
      )}
    </main>
  );
}
