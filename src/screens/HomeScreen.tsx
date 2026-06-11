import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import BodyBatteryBar from '../components/BodyBatteryBar';
import Header from '../components/Header';
import JournalCard from '../components/JournalCard';
import PressableScale from '../components/PressableScale';
import RecoveryRing from '../components/RecoveryRing';
import SleepCard from '../components/SleepCard';
import StatRow from '../components/StatRow';
import StrainCard from '../components/StrainCard';
import StressCard from '../components/StressCard';
import WeekTrendStrip from '../components/WeekTrendStrip';
import WhoopAgeCard from '../components/WhoopAgeCard';
import { Screen } from '../components/ui';
import { readinessSummary, stressToday, today, week, whoopAge } from '../data/mockData';
import { MetricId } from '../data/metrics';
import { spacing } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const openMetric = (metricId: MetricId) => navigation.navigate('MetricDetail', { metricId });

  return (
    <Screen>
      <Header userName={today.userName} summary={readinessSummary(today)} />
      <PressableScale onPress={() => openMetric('recovery')}>
        <RecoveryRing score={today.recovery} hrv={today.hrv} restingHr={today.restingHr} />
      </PressableScale>
      <View style={styles.cardRow}>
        <PressableScale style={styles.flex} onPress={() => openMetric('sleep')}>
          <SleepCard
            durationMinutes={today.sleep.durationMinutes}
            performance={today.sleep.performance}
            needMinutes={today.sleep.needMinutes}
          />
        </PressableScale>
        <PressableScale style={styles.flex} onPress={() => openMetric('strain')}>
          <StrainCard strain={today.strain} target={today.strainTarget} />
        </PressableScale>
      </View>
      <PressableScale onPress={() => openMetric('stress')}>
        <StressCard stress={stressToday} />
      </PressableScale>
      <PressableScale onPress={() => openMetric('bodyBattery')}>
        <BodyBatteryBar level={today.bodyBattery} />
      </PressableScale>
      <StatRow
        steps={today.steps}
        calories={today.calories}
        onPressSteps={() => openMetric('steps')}
        onPressCalories={() => openMetric('calories')}
      />
      <PressableScale onPress={() => navigation.navigate('Biology')}>
        <WhoopAgeCard age={whoopAge} compact />
      </PressableScale>
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
