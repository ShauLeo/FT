export interface DayMetrics {
  /** Short weekday label, e.g. "Mon" */
  day: string;
  recovery: number; // 0-100
  strain: number; // 0-21 (Whoop scale)
  sleepHours: number;
}

export interface TodayMetrics {
  userName: string;
  recovery: number; // 0-100
  strain: number; // 0-21
  strainTarget: number; // optimal strain for today's recovery
  sleep: {
    durationMinutes: number;
    performance: number; // % of sleep need met
    needMinutes: number;
  };
  bodyBattery: number; // 0-100 (Garmin)
  hrv: number; // ms
  restingHr: number; // bpm
  steps: number;
  calories: number;
}

export const today: TodayMetrics = {
  userName: 'Shau',
  recovery: 74,
  strain: 12.4,
  strainTarget: 14.5,
  sleep: {
    durationMinutes: 7 * 60 + 42,
    performance: 86,
    needMinutes: 8 * 60 + 58,
  },
  bodyBattery: 68,
  hrv: 62,
  restingHr: 54,
  steps: 8412,
  calories: 2143,
};

export const week: DayMetrics[] = [
  { day: 'Fri', recovery: 55, strain: 14.1, sleepHours: 6.8 },
  { day: 'Sat', recovery: 81, strain: 9.3, sleepHours: 8.2 },
  { day: 'Sun', recovery: 88, strain: 7.8, sleepHours: 8.5 },
  { day: 'Mon', recovery: 62, strain: 15.6, sleepHours: 7.1 },
  { day: 'Tue', recovery: 41, strain: 17.2, sleepHours: 6.2 },
  { day: 'Wed', recovery: 67, strain: 11.4, sleepHours: 7.6 },
  { day: 'Thu', recovery: 74, strain: 12.4, sleepHours: 7.7 },
];

export const readinessSummary = (m: TodayMetrics): string => {
  if (m.recovery >= 67) {
    return `Your body is well recovered. Today is a good day to take on a strain of up to ${m.strainTarget.toFixed(1)}.`;
  }
  if (m.recovery >= 34) {
    return `Your body is moderately recovered. Aim for a balanced day around ${m.strainTarget.toFixed(1)} strain.`;
  }
  return 'Your body needs rest. Keep strain low and prioritize sleep tonight.';
};

export const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m.toString().padStart(2, '0')}m`;
};
