export interface DayMetrics {
  /** Short weekday label, e.g. "Mon" */
  day: string;
  recovery: number; // 0-100
  strain: number; // 0-21 (Whoop scale)
  sleepHours: number;
}

export interface SleepStages {
  awakeMinutes: number;
  lightMinutes: number;
  remMinutes: number;
  deepMinutes: number;
}

export interface SleepDetail {
  score: number; // 0-100
  bedtime: string;
  wakeTime: string;
  timeToFallAsleepMinutes: number;
  stages: SleepStages;
  sleepDebtMinutes: number; // accumulated debt (goose: sleep bank)
  hrDipPercent: number; // overnight heart-rate dip (goose vital)
  respiratoryRate: number; // breaths/min
  spo2: number; // %
  wristTempDeltaC: number; // deviation from baseline
}

export interface Workout {
  id: string;
  type: string;
  icon: string;
  durationMinutes: number;
  strain: number;
  calories: number;
  avgHr: number;
  day: string;
}

export interface HrZone {
  zone: string;
  range: string;
  minutes: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  icon: string;
}

export interface Macros {
  proteinG: number;
  proteinTargetG: number;
  carbsG: number;
  carbsTargetG: number;
  fatG: number;
  fatTargetG: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  icon: string;
  tag?: string;
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

export const sleepDetail: SleepDetail = {
  score: 86,
  bedtime: '23:12',
  wakeTime: '06:58',
  timeToFallAsleepMinutes: 14,
  stages: {
    awakeMinutes: 24,
    lightMinutes: 252,
    remMinutes: 96,
    deepMinutes: 90,
  },
  sleepDebtMinutes: 76,
  hrDipPercent: 21,
  respiratoryRate: 14.2,
  spo2: 97,
  wristTempDeltaC: -0.2,
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

export const workouts: Workout[] = [
  { id: 'w1', type: 'Running', icon: '🏃', durationMinutes: 42, strain: 10.8, calories: 486, avgHr: 152, day: 'Today' },
  { id: 'w2', type: 'Strength', icon: '🏋️', durationMinutes: 55, strain: 8.2, calories: 312, avgHr: 121, day: 'Yesterday' },
  { id: 'w3', type: 'Cycling', icon: '🚴', durationMinutes: 78, strain: 13.6, calories: 740, avgHr: 144, day: 'Tue' },
  { id: 'w4', type: 'Yoga', icon: '🧘', durationMinutes: 30, strain: 3.1, calories: 96, avgHr: 84, day: 'Mon' },
];

export const hrZones: HrZone[] = [
  { zone: 'Zone 1', range: '98–117', minutes: 34 },
  { zone: 'Zone 2', range: '118–136', minutes: 28 },
  { zone: 'Zone 3', range: '137–155', minutes: 19 },
  { zone: 'Zone 4', range: '156–175', minutes: 9 },
  { zone: 'Zone 5', range: '176+', minutes: 2 },
];

export const meals: Meal[] = [
  { id: 'm1', name: 'Oatmeal + berries', time: '07:30', calories: 410, icon: '🥣' },
  { id: 'm2', name: 'Chicken rice bowl', time: '12:45', calories: 680, icon: '🍗' },
  { id: 'm3', name: 'Greek yogurt snack', time: '16:10', calories: 190, icon: '🥛' },
  { id: 'm4', name: 'Salmon + veggies', time: '19:20', calories: 590, icon: '🐟' },
];

export const macros: Macros = {
  proteinG: 128,
  proteinTargetG: 150,
  carbsG: 204,
  carbsTargetG: 250,
  fatG: 61,
  fatTargetG: 80,
};

export const calorieTarget = 2400;

export const products: Product[] = [
  { id: 'p1', name: 'SuperKnit Band', price: '$49', icon: '⌚', tag: 'Best seller' },
  { id: 'p2', name: 'Charging Dock', price: '$29', icon: '🔌' },
  { id: 'p3', name: 'HR Chest Strap', price: '$79', icon: '❤️' },
  { id: 'p4', name: 'Training Tee', price: '$35', icon: '👕', tag: 'New' },
  { id: 'p5', name: 'Smart Scale', price: '$99', icon: '⚖️' },
  { id: 'p6', name: 'Hydration Bottle', price: '$24', icon: '💧' },
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
