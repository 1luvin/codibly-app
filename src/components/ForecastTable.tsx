'use client';

import {
  ArrowDown,
  ArrowUp,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  HelpCircle,
  Snowflake,
  Sun,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

export interface ForecastDay {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  energyKWh: number;
}

interface ForecastTableProps {
  forecast: ForecastDay[];
}

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => {
  const [sortBy, setSortBy] = useState<keyof ForecastDay>('date');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedForecast = [...forecast].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortAsc ? valueA - valueB : valueB - valueA;
    }

    return sortAsc
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const handleSort = (key: keyof ForecastDay) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-zinc-700 shadow-sm mt-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
        <thead className="bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 text-sm">
        <tr>
          {header('date', 'Date')}
          {header('weatherCode', 'Weather')}
          {header('minTemperature', 'Min Temperature (°C)')}
          {header('maxTemperature', 'Max Temperature (°C)')}
          {header('energyKWh', 'Energy (kWh)')}
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-800 text-center text-sm">
        {sortedForecast.map((day) => (
          <tr key={day.date} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
            <td className="px-3 py-2 whitespace-nowrap">{day.date}</td>
            <td className="px-3 py-2 flex items-center justify-center gap-2">
              {getWeatherIcon(day.weatherCode)}
              <span className="hidden sm:inline">{getWeatherLabel(day.weatherCode)}</span>
            </td>
            <td className="px-3 py-2">{day.minTemperature.toFixed(1)}</td>
            <td className="px-3 py-2">{day.maxTemperature.toFixed(1)}</td>
            <td className="px-3 py-2">{day.energyKWh.toFixed(2)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

  function header(field: keyof ForecastDay, label: string) {
    const isActive = sortBy === field;
    return (
      <th
        className="px-4 py-3 text-left cursor-pointer select-none"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          {label}
          {isActive && (sortAsc ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}
        </div>
      </th>
    );
  }
};

function getWeatherIcon(code: number) {
  if ([0, 1].includes(code)) return <Sun size={20} className="text-yellow-400"/>;
  if ([2].includes(code)) return <CloudSun size={20} className="text-yellow-300"/>;
  if ([3].includes(code)) return <Cloud size={20} className="text-gray-400"/>;
  if ([45, 48].includes(code)) return <Cloud size={20} className="text-blue-300"/>;
  if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle size={20} className="text-blue-500"/>;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain size={20} className="text-blue-600"/>;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Snowflake size={20} className="text-blue-300"/>;
  if ([95, 96, 99].includes(code)) return <Zap size={20} className="text-purple-500"/>;
  return <HelpCircle size={20}/>;
}

function getWeatherLabel(code: number): string {
  if ([0, 1].includes(code)) return 'Clear';
  if ([2].includes(code)) return 'Partly Cloudy';
  if ([3].includes(code)) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
}

export default ForecastTable;
