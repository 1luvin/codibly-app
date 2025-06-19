export interface ForecastResponseDto {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  energyKWh: number;
}

export interface WeeklySummaryResponseDto {
  averagePressure: number;
  averageSunshineHours: number;
  minTemperature: number;
  maxTemperature: number;
  summary: string;
}
