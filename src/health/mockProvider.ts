import { sleepDetail, today, week, workouts } from '../data/mockData';
import { HealthProvider, HealthSnapshot } from './types';

export const mockProvider: HealthProvider = {
  id: 'mock',
  name: 'Demo Data',
  transport: 'Built-in mock',

  isAvailable: async () => true,
  connect: async () => {},
  disconnect: async () => {},

  fetchSnapshot: async (): Promise<HealthSnapshot> => ({
    today,
    week,
    sleep: sleepDetail,
    workouts,
  }),
};
