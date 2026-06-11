export interface Palette {
  background: string;
  card: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  recoveryGreen: string;
  recoveryYellow: string;
  recoveryRed: string;
  strainBlue: string;
  sleepPurple: string;

  batteryLow: string;
  batteryMid: string;
  batteryHigh: string;

  track: string;
  accent: string;
}

export const darkPalette: Palette = {
  background: '#0A0E14',
  card: '#141A23',
  cardBorder: '#1F2733',
  textPrimary: '#F2F5F9',
  textSecondary: '#8B96A5',
  textTertiary: '#5C6675',

  recoveryGreen: '#2DD4A7',
  recoveryYellow: '#F5C944',
  recoveryRed: '#F4615E',
  strainBlue: '#4D9FFF',
  sleepPurple: '#9D7BFF',

  batteryLow: '#F4615E',
  batteryMid: '#F5C944',
  batteryHigh: '#2DD4A7',

  track: '#222B38',
  accent: '#4D9FFF',
};

export const lightPalette: Palette = {
  background: '#F4F6FA',
  card: '#FFFFFF',
  cardBorder: '#E4E9F1',
  textPrimary: '#101724',
  textSecondary: '#525E6E',
  textTertiary: '#8893A2',

  recoveryGreen: '#0FA97F',
  recoveryYellow: '#D9A210',
  recoveryRed: '#E04540',
  strainBlue: '#1E7FE8',
  sleepPurple: '#7A53E8',

  batteryLow: '#E04540',
  batteryMid: '#D9A210',
  batteryHigh: '#0FA97F',

  track: '#E6EBF2',
  accent: '#1E7FE8',
};

export const recoveryColor = (score: number, c: Palette): string => {
  if (score >= 67) return c.recoveryGreen;
  if (score >= 34) return c.recoveryYellow;
  return c.recoveryRed;
};

export const recoveryLabel = (score: number): string => {
  if (score >= 67) return 'GREEN';
  if (score >= 34) return 'YELLOW';
  return 'RED';
};

export const spacing = {
  screen: 20,
  card: 16,
  gap: 12,
};

export const radius = {
  card: 20,
};
