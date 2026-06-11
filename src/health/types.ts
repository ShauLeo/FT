import { DayMetrics, SleepDetail, TodayMetrics, Workout } from '../data/mockData';

export type ProviderId = 'apple-health' | 'whoop' | 'garmin' | 'coros' | 'fitbit' | 'mock';

export interface HealthSnapshot {
  today: TodayMetrics;
  week: DayMetrics[];
  sleep: SleepDetail;
  workouts: Workout[];
}

/**
 * Common interface every data source implements — HealthKit (Apple Watch),
 * vendor cloud APIs (Whoop/Garmin/Coros/Fitbit), or direct BLE (goose-style).
 * Screens only ever talk to this interface, so swapping mock data for a
 * real device is a one-line provider change.
 */
export interface HealthProvider {
  id: ProviderId;
  name: string;
  /** e.g. "HealthKit", "Cloud API (OAuth)", "Bluetooth LE" */
  transport: string;
  /** Can this provider work in the current runtime (platform, native modules)? */
  isAvailable(): Promise<boolean>;
  /** Request permissions / start OAuth / pair the device. */
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  fetchSnapshot(): Promise<HealthSnapshot>;
}
