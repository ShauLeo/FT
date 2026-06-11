import { appleHealthProvider } from './appleHealthProvider';
import { mockProvider } from './mockProvider';
import { HealthProvider, ProviderId } from './types';

/**
 * Cloud-API providers are stubs for now: each needs an OAuth app registration
 * with the vendor plus a small token-exchange backend. Transport notes are
 * accurate so the Settings screen can explain how each one will connect.
 * Details per vendor in docs/HEALTH_INTEGRATION.md.
 */
const cloudStub = (id: ProviderId, name: string): HealthProvider => ({
  id,
  name,
  transport: 'Cloud API (OAuth)',
  isAvailable: async () => false,
  connect: async () => {
    throw new Error(`${name} requires an OAuth app — see docs/HEALTH_INTEGRATION.md`);
  },
  disconnect: async () => {},
  fetchSnapshot: async () => {
    throw new Error('Not connected');
  },
});

export const providers: HealthProvider[] = [
  appleHealthProvider,
  cloudStub('whoop', 'Whoop'),
  cloudStub('garmin', 'Garmin'),
  cloudStub('coros', 'Coros'),
  cloudStub('fitbit', 'Fitbit'),
  // Strava is workouts-only: import activities, export logged workouts
  cloudStub('strava', 'Strava'),
];

/** The provider currently feeding the app's screens. */
export const activeProvider: HealthProvider = mockProvider;
