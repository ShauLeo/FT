import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import BodyBatteryBar from '../components/BodyBatteryBar';
import Header from '../components/Header';
import JournalCard from '../components/JournalCard';
import RecoveryRing from '../components/RecoveryRing';
import SleepCard from '../components/SleepCard';
import StatRow from '../components/StatRow';
import StrainCard from '../components/StrainCard';
import StressCard from '../components/StressCard';
import WeekTrendStrip from '../components/WeekTrendStrip';
import WhoopAgeCard from '../components/WhoopAgeCard';
import { Screen } from '../components/ui';
import { readinessSummary, stressToday, today, week, whoopAge } from '../data/mockData';
import { spacing } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <Screen>
      <Header userName={today.userName} summary={readinessSummary(today)} />
      <Pressable onPress={() => navigation.navigate('Biology')}>
        <RecoveryRing score={today.recovery} hrv={today.hrv} restingHr={today.restingHr} />
      </Pressable>
      <View style={styles.cardRow}>
        <Pressable style={styles.flex} onPress={() => navigation.navigate('Biology')}>
          <SleepCard
            durationMinutes={today.sleep.durationMinutes}
            performance={today.sleep.performance}
            needMinutes={today.sleep.needMinutes}
          />
        </Pressable>
        <Pressable style={styles.flex} onPress={() => navigation.navigate('Fitness')}>
          <StrainCard strain={today.strain} target={today.strainTarget} />
        </Pressable>
      </View>
      <StressCard stress={stressToday} />
      <BodyBatteryBar level={today.bodyBattery} />
      <Pressable onPress={() => navigation.navigate('Fitness')}>
        <StatRow steps={today.steps} calories={today.calories} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Biology')}>
        <WhoopAgeCard age={whoopAge} compact />
      </Pressable>
      <JournalCard />
      <WeekTrendStrip days={week} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    gap: spacing.gap,
  },
  flex: {
    flex: 1,
  },
});
