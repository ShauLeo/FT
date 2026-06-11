import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import BodyBatteryBar from './src/components/BodyBatteryBar';
import Header from './src/components/Header';
import RecoveryRing from './src/components/RecoveryRing';
import SleepCard from './src/components/SleepCard';
import StatRow from './src/components/StatRow';
import StrainCard from './src/components/StrainCard';
import WeekTrendStrip from './src/components/WeekTrendStrip';
import { readinessSummary, today, week } from './src/data/mockData';
import { colors, spacing } from './src/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header userName={today.userName} summary={readinessSummary(today)} />
        <RecoveryRing score={today.recovery} hrv={today.hrv} restingHr={today.restingHr} />
        <View style={styles.cardRow}>
          <SleepCard
            durationMinutes={today.sleep.durationMinutes}
            performance={today.sleep.performance}
            needMinutes={today.sleep.needMinutes}
          />
          <StrainCard strain={today.strain} target={today.strainTarget} />
        </View>
        <BodyBatteryBar level={today.bodyBattery} />
        <StatRow steps={today.steps} calories={today.calories} />
        <WeekTrendStrip days={week} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: spacing.gap,
    maxWidth: 430,
    padding: spacing.screen,
    paddingBottom: 40,
    width: '100%',
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    gap: spacing.gap,
  },
});
