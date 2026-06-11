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
  /** Ionicons glyph name */
  icon: string;
  durationMinutes: number;
  strain: number;
  calories: number;
  avgHr: number;
  day: string;
  source?: 'manual' | 'strava' | 'device';
}

// ---- Whoop-standard features ----

export interface WhoopAge {
  chronologicalAge: number;
  physiologicalAge: number;
  /** <1 means aging slower than real time */
  paceOfAging: number;
  drivers: { label: string; impact: 'positive' | 'negative'; detail: string }[];
}

export interface StressPoint {
  hour: string; // "06"
  level: number; // 0-3 Whoop stress scale
}

export interface StressToday {
  current: number; // 0-3
  label: 'Low' | 'Medium' | 'High';
  nonActivityShare: number; // % of stress not from workouts
  timeline: StressPoint[];
}

export interface HealthRange {
  metric: string;
  value: number;
  unit: string;
  low: number;
  high: number;
}

export interface JournalEntry {
  id: string;
  question: string;
  answered: boolean | null;
  impact: string; // e.g. "+9% recovery when yes"
}

export interface SleepCoachPlan {
  goal: 'Peak' | 'Perform' | 'Get By';
  recommendedBedtime: string;
  recommendedWake: string;
  sleepNeedMinutes: number;
}

// ---- Strong-style strength logging ----

export interface StrengthSet {
  reps: number;
  weightKg: number;
  isPr?: boolean;
}

export interface StrengthExercise {
  name: string;
  sets: StrengthSet[];
}

export interface StrengthSession {
  id: string;
  template: string;
  day: string;
  durationMinutes: number;
  volumeKg: number;
  exercises: StrengthExercise[];
}

export interface StrengthTemplate {
  id: string;
  name: string;
  exercises: string[];
  lastPerformed: string;
}

export interface PersonalRecord {
  exercise: string;
  weightKg: number;
  reps: number;
  date: string;
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
  /** Ionicons glyph name */
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

// ---- Aessence (aessence.co) storefront ----

export interface AessenceTier {
  id: string;
  name: string;
  pricePerMonth: string;
  tagline: string;
  features: string[];
  popular?: boolean;
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
  { id: 'w1', type: 'Running', icon: 'walk', durationMinutes: 42, strain: 10.8, calories: 486, avgHr: 152, day: 'Today', source: 'strava' },
  { id: 'w2', type: 'Strength', icon: 'barbell', durationMinutes: 55, strain: 8.2, calories: 312, avgHr: 121, day: 'Yesterday', source: 'manual' },
  { id: 'w3', type: 'Cycling', icon: 'bicycle', durationMinutes: 78, strain: 13.6, calories: 740, avgHr: 144, day: 'Tue', source: 'strava' },
  { id: 'w4', type: 'Yoga', icon: 'body', durationMinutes: 30, strain: 3.1, calories: 96, avgHr: 84, day: 'Mon', source: 'device' },
];

export const whoopAge: WhoopAge = {
  chronologicalAge: 29,
  physiologicalAge: 25.4,
  paceOfAging: 0.82,
  drivers: [
    { label: 'Sleep consistency', impact: 'positive', detail: '92% consistent bed/wake times' },
    { label: 'Zone 2 cardio', impact: 'positive', detail: '156 min/week of steady-state work' },
    { label: 'Strength training', impact: 'positive', detail: '2.4 sessions/week' },
    { label: 'Late meals', impact: 'negative', detail: 'Eating within 2h of bedtime 3×/week' },
  ],
};

export const stressToday: StressToday = {
  current: 1.2,
  label: 'Low',
  nonActivityShare: 64,
  timeline: [
    { hour: '06', level: 0.4 },
    { hour: '08', level: 1.1 },
    { hour: '10', level: 2.3 },
    { hour: '12', level: 1.6 },
    { hour: '14', level: 2.8 },
    { hour: '16', level: 1.9 },
    { hour: '18', level: 1.0 },
    { hour: '20', level: 0.6 },
  ],
};

export const healthRanges: HealthRange[] = [
  { metric: 'Resting HR', value: 54, unit: 'bpm', low: 48, high: 62 },
  { metric: 'HRV', value: 62, unit: 'ms', low: 45, high: 95 },
  { metric: 'Resp. rate', value: 14.2, unit: '/min', low: 12, high: 17 },
  { metric: 'SpO2', value: 97, unit: '%', low: 95, high: 100 },
  { metric: 'Skin temp', value: -0.2, unit: '°C dev', low: -1, high: 1 },
];

export const journal: JournalEntry[] = [
  { id: 'j1', question: 'Caffeine after 2pm?', answered: false, impact: '+6% recovery when no' },
  { id: 'j2', question: 'Magnesium before bed?', answered: true, impact: '+4% deep sleep when yes' },
  { id: 'j3', question: 'Screen time in bed?', answered: null, impact: '−8% sleep score when yes' },
  { id: 'j4', question: 'Alcohol?', answered: false, impact: '−11% recovery when yes' },
];

export const sleepCoach: SleepCoachPlan = {
  goal: 'Perform',
  recommendedBedtime: '22:50',
  recommendedWake: '06:45',
  sleepNeedMinutes: 8 * 60 + 58,
};

export const strengthTemplates: StrengthTemplate[] = [
  { id: 't1', name: 'Push Day A', exercises: ['Bench Press', 'Overhead Press', 'Incline DB Press', 'Triceps Pushdown'], lastPerformed: 'Yesterday' },
  { id: 't2', name: 'Pull Day A', exercises: ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Face Pull'], lastPerformed: '3 days ago' },
  { id: 't3', name: 'Leg Day', exercises: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raise'], lastPerformed: '5 days ago' },
];

export const lastStrengthSession: StrengthSession = {
  id: 's1',
  template: 'Push Day A',
  day: 'Yesterday',
  durationMinutes: 55,
  volumeKg: 6240,
  exercises: [
    {
      name: 'Bench Press',
      sets: [
        { reps: 8, weightKg: 80 },
        { reps: 6, weightKg: 85 },
        { reps: 5, weightKg: 90, isPr: true },
      ],
    },
    {
      name: 'Overhead Press',
      sets: [
        { reps: 8, weightKg: 50 },
        { reps: 8, weightKg: 50 },
        { reps: 6, weightKg: 52.5 },
      ],
    },
    {
      name: 'Incline DB Press',
      sets: [
        { reps: 10, weightKg: 30 },
        { reps: 10, weightKg: 30 },
        { reps: 8, weightKg: 32 },
      ],
    },
  ],
};

export const personalRecords: PersonalRecord[] = [
  { exercise: 'Bench Press', weightKg: 90, reps: 5, date: 'Yesterday' },
  { exercise: 'Back Squat', weightKg: 130, reps: 3, date: 'May 28' },
  { exercise: 'Deadlift', weightKg: 160, reps: 2, date: 'May 14' },
];

export const hrZones: HrZone[] = [
  { zone: 'Zone 1', range: '98–117', minutes: 34 },
  { zone: 'Zone 2', range: '118–136', minutes: 28 },
  { zone: 'Zone 3', range: '137–155', minutes: 19 },
  { zone: 'Zone 4', range: '156–175', minutes: 9 },
  { zone: 'Zone 5', range: '176+', minutes: 2 },
];

export const meals: Meal[] = [
  { id: 'm1', name: 'Oatmeal + berries', time: '07:30', calories: 410, icon: 'cafe' },
  { id: 'm2', name: 'Chicken rice bowl', time: '12:45', calories: 680, icon: 'restaurant' },
  { id: 'm3', name: 'Greek yogurt snack', time: '16:10', calories: 190, icon: 'ice-cream' },
  { id: 'm4', name: 'Salmon + veggies', time: '19:20', calories: 590, icon: 'fish' },
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

export const aessenceTiers: AessenceTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    pricePerMonth: '€39.90',
    tagline: 'The foundation, clinically dosed',
    features: ['Creatine monohydrate', 'Performance multivitamin', 'Personal training program'],
  },
  {
    id: 'athlete',
    name: 'Athlete',
    pricePerMonth: '€69.90',
    tagline: 'Your formula, your program',
    features: [
      'Everything in Essential',
      '3 additional compounds for your goal',
      'Coaching notes with every refill',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    pricePerMonth: '€89.90',
    tagline: 'The full professional stack',
    features: [
      'Full 6-compound personal formula',
      'Whey isolate included',
      'Quarterly formula refresh',
      'Priority coach access',
    ],
  },
];

export const aessenceBenefits = [
  { icon: 'flask', text: 'Clinically dosed — no proprietary blends' },
  { icon: 'document-text', text: 'Peer-reviewed research behind every compound' },
  { icon: 'shield-checkmark', text: 'Third-party tested, made in Germany' },
  { icon: 'gift', text: 'Welcome bundle worth €84 with every plan' },
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
