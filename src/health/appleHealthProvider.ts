import { Platform } from 'react-native';

import { HealthProvider, HealthSnapshot } from './types';

/**
 * Apple Watch via HealthKit — the planned test device.
 *
 * HealthKit is a native iOS framework, so this provider only works in a
 * custom dev/production build (EAS Build), NOT in Expo Go or on web.
 * See docs/HEALTH_INTEGRATION.md for the step-by-step setup. In short:
 *
 *   1. npx expo install @kingstinct/react-native-healthkit
 *   2. Add the plugin + NSHealthShareUsageDescription to app.json
 *   3. eas build --profile development --platform ios (needs Apple Dev account)
 *   4. Replace the queryTodayMetrics stub below with real HealthKit queries
 *      (sleepAnalysis, heartRateVariabilitySDNN, restingHeartRate, stepCount,
 *       activeEnergyBurned) and map them to HealthSnapshot.
 */
export const appleHealthProvider: HealthProvider = {
  id: 'apple-health',
  name: 'Apple Watch (HealthKit)',
  transport: 'HealthKit',

  isAvailable: async () => {
    if (Platform.OS !== 'ios') return false;
    // The HealthKit native module only exists in a custom dev build.
    try {
      require('@kingstinct/react-native-healthkit');
      return true;
    } catch {
      return false;
    }
  },

  connect: async () => {
    throw new Error(
      'HealthKit requires a custom iOS build — see docs/HEALTH_INTEGRATION.md'
    );
  },

  disconnect: async () => {},

  fetchSnapshot: async (): Promise<HealthSnapshot> => {
    throw new Error('Not implemented yet — wire up HealthKit queries here.');
  },
};
