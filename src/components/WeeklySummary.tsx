'use client';

import { WeeklySummaryResponseDto } from '@/types/forecast';
import { ReactNode } from 'react';

interface Props {
  summary: WeeklySummaryResponseDto;
}

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-2xl shadow-md bg-white dark:bg-zinc-800 p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
      <div className="text-gray-700 dark:text-gray-300 text-sm">{children}</div>
    </div>
  );
}

export default function WeeklySummary({ summary }: Props) {
  const {
    averagePressure,
    averageSunshineHours,
    minTemperature,
    maxTemperature,
    summary: precipitationSummary,
  } = summary;

  const precipitationLabel =
    precipitationSummary === 'with_precipitation'
      ? 'Precipitation'
      : 'No precipitation';

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Weekly Summary</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Average Pressure">
          <p>{averagePressure.toFixed(1)} hPa</p>
        </Card>
        <Card title="Average Sunshine">
          <p>{averageSunshineHours.toFixed(1)} h/day</p>
        </Card>
        <Card title="Temperature (min. – max.)">
          <p>
            {minTemperature.toFixed(1)}°C – {maxTemperature.toFixed(1)}°C
          </p>
        </Card>
        <Card title="Weather Summary">
          <p>{precipitationLabel}</p>
        </Card>
      </div>
    </section>
  );
}
