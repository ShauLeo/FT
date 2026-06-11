export const colors = {
  background: '#0A0E14',
  card: '#141A23',
  cardBorder: '#1F2733',
  textPrimary: '#F2F5F9',
  textSecondary: '#8B96A5',
  textTertiary: '#5C6675',

  // Whoop-style status colors
  recoveryGreen: '#2DD4A7',
  recoveryYellow: '#F5C944',
  recoveryRed: '#F4615E',
  strainBlue: '#4D9FFF',
  sleepPurple: '#9D7BFF',

  // Garmin body battery gradient
  batteryLow: '#F4615E',
  batteryMid: '#F5C944',
  batteryHigh: '#2DD4A7',

  trackDark: '#222B38',
};

export const recoveryColor = (score: number): string => {
  if (score >= 67) return colors.recoveryGreen;
  if (score >= 34) return colors.recoveryYellow;
  return colors.recoveryRed;
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
