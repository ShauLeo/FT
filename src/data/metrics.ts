import { Palette } from '../theme';

export type MetricId =
  | 'sleep'
  | 'recovery'
  | 'strain'
  | 'rhr'
  | 'hrv'
  | 'resp'
  | 'spo2'
  | 'temp'
  | 'stress'
  | 'bodyBattery'
  | 'steps'
  | 'calories';

export interface MetricInfo {
  id: MetricId;
  name: string;
  unit: string;
  /** Palette key used for the chart and accents */
  colorKey: keyof Palette;
  /** Ionicons glyph */
  icon: string;
  current: number;
  decimals: number;
  /** 'up' means a rising trend is good */
  goodDirection: 'up' | 'down' | 'range';
  /** Last 30 days, oldest first */
  series: number[];
  /** Plain-language explanation shown in the Info field */
  info: string;
  /** What the last-night/today reading means */
  insight: string;
}

/** Deterministic pseudo-random walk so charts look organic but stable. */
const walk = (start: number, end: number, jitter: number, seed: number): number[] => {
  const out: number[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  for (let i = 0; i < 30; i++) {
    const base = start + ((end - start) * i) / 29;
    out.push(Math.round((base + rand() * jitter) * 10) / 10);
  }
  out[out.length - 1] = end;
  return out;
};

export const metrics: Record<MetricId, MetricInfo> = {
  sleep: {
    id: 'sleep',
    name: 'Sleep duration',
    unit: 'h',
    colorKey: 'sleepPurple',
    icon: 'moon',
    current: 7.7,
    decimals: 1,
    goodDirection: 'up',
    series: walk(6.9, 7.7, 1.1, 11),
    info: 'Total time asleep, excluding time awake in bed. Adults typically need 7–9 hours; your personal need is calculated from sleep debt, recent strain and naps.',
    insight: 'You met 86% of your 8h 58m sleep need last night.',
  },
  recovery: {
    id: 'recovery',
    name: 'Recovery',
    unit: '%',
    colorKey: 'recoveryGreen',
    icon: 'refresh-circle',
    current: 74,
    decimals: 0,
    goodDirection: 'up',
    series: walk(58, 74, 22, 23),
    info: 'A 0–100% readiness score combining HRV, resting heart rate, respiratory rate and sleep performance. Green (67%+) means your body is primed to perform; red (<34%) means it needs rest.',
    insight: 'Green recovery — a good day to take on strain up to 14.5.',
  },
  strain: {
    id: 'strain',
    name: 'Day strain',
    unit: '',
    colorKey: 'strainBlue',
    icon: 'speedometer',
    current: 12.4,
    decimals: 1,
    goodDirection: 'range',
    series: walk(9, 12.4, 6, 37),
    info: 'Cardiovascular load on a logarithmic 0–21 scale (the Whoop scale). It is personal: the same run scores differently depending on your fitness. 10–14 is a solid training day; 18+ is all-out.',
    insight: 'You are 2.1 below today’s optimal strain target of 14.5.',
  },
  rhr: {
    id: 'rhr',
    name: 'Resting heart rate',
    unit: 'bpm',
    colorKey: 'recoveryRed',
    icon: 'heart',
    current: 54,
    decimals: 0,
    goodDirection: 'down',
    series: walk(58, 54, 4, 41),
    info: 'Your heart rate at complete rest, measured during deep sleep. Lower usually signals better aerobic fitness. Sudden rises can flag stress, illness or poor recovery.',
    insight: '54 bpm is inside your 48–62 baseline range.',
  },
  hrv: {
    id: 'hrv',
    name: 'Heart rate variability',
    unit: 'ms',
    colorKey: 'recoveryGreen',
    icon: 'pulse',
    current: 62,
    decimals: 0,
    goodDirection: 'up',
    series: walk(51, 62, 14, 53),
    info: 'HRV measures the variation in time between heartbeats, controlled by your autonomic nervous system. Higher variability means your body is relaxed and ready to adapt; it drops when you are stressed, ill or under-recovered. It is the single biggest input to your recovery score.',
    insight: '62 ms is 8% above your 30-day average — trending up.',
  },
  resp: {
    id: 'resp',
    name: 'Respiratory rate',
    unit: '/min',
    colorKey: 'strainBlue',
    icon: 'cloud',
    current: 14.2,
    decimals: 1,
    goodDirection: 'range',
    series: walk(14.6, 14.2, 0.8, 67),
    info: 'Breaths per minute during sleep. It is one of your most stable vitals — a rise of more than ~1 breath/min above baseline is an early warning sign of illness.',
    insight: 'Stable at 14.2 — no deviation from baseline.',
  },
  spo2: {
    id: 'spo2',
    name: 'Blood oxygen',
    unit: '%',
    colorKey: 'strainBlue',
    icon: 'water',
    current: 97,
    decimals: 0,
    goodDirection: 'range',
    series: walk(96.4, 97, 1.2, 71),
    info: 'The percentage of oxygen carried in your blood, measured overnight. Healthy values sit between 95–100%. Consistently lower readings can indicate breathing disturbances during sleep.',
    insight: '97% — comfortably within the healthy 95–100% band.',
  },
  temp: {
    id: 'temp',
    name: 'Skin temperature',
    unit: '°C dev',
    colorKey: 'recoveryYellow',
    icon: 'thermometer',
    current: -0.2,
    decimals: 1,
    goodDirection: 'range',
    series: walk(0.1, -0.2, 0.5, 83),
    info: 'Deviation of your wrist temperature from your personal baseline, measured during sleep. Spikes above +1°C often precede illness; it also shifts across hormonal cycles.',
    insight: '−0.2°C from baseline — normal.',
  },
  stress: {
    id: 'stress',
    name: 'Stress',
    unit: '',
    colorKey: 'stressPurple',
    icon: 'flash',
    current: 1.2,
    decimals: 1,
    goodDirection: 'down',
    series: walk(1.7, 1.2, 1.0, 89),
    info: 'A 0–3 score built from heart rate and HRV relative to your baseline, like Whoop’s stress monitor. It captures physiological stress from any source — work, caffeine, training or poor sleep.',
    insight: 'Low (1.2) — 64% of today’s stress came outside workouts.',
  },
  bodyBattery: {
    id: 'bodyBattery',
    name: 'Body battery',
    unit: '',
    colorKey: 'recoveryGreen',
    icon: 'battery-half',
    current: 68,
    decimals: 0,
    goodDirection: 'up',
    series: walk(54, 68, 24, 97),
    info: 'Garmin-style energy gauge from 0–100. It charges while you sleep and relax, and drains with stress and activity. Plan demanding sessions when it is high.',
    insight: '68 — enough reserve for a quality evening session.',
  },
  steps: {
    id: 'steps',
    name: 'Steps',
    unit: '',
    colorKey: 'strainBlue',
    icon: 'footsteps',
    current: 8412,
    decimals: 0,
    goodDirection: 'up',
    series: walk(7200, 8412, 3200, 101),
    info: 'Daily step count. Beyond workouts, overall daily movement strongly influences long-term health — 7,000–10,000 steps a day is a robust target.',
    insight: '8,412 so far — on pace to beat your 30-day average.',
  },
  calories: {
    id: 'calories',
    name: 'Calories burned',
    unit: 'kcal',
    colorKey: 'recoveryYellow',
    icon: 'flame',
    current: 2143,
    decimals: 0,
    goodDirection: 'range',
    series: walk(2050, 2143, 420, 113),
    info: 'Total energy expenditure: your basal metabolic rate plus activity. Useful together with the Food tab to balance intake and output for your goal.',
    insight: '2,143 kcal — 257 below your 2,400 kcal intake target.',
  },
};

export const metricChange7d = (m: MetricInfo): number => {
  const last7 = m.series.slice(-7);
  const prev7 = m.series.slice(-14, -7);
  const avg = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
  const prev = avg(prev7);
  if (prev === 0) return 0;
  return ((avg(last7) - prev) / Math.abs(prev)) * 100;
};
