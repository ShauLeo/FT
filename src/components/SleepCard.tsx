import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '../data/mockData';
import { colors, radius, spacing } from '../theme';

interface Props {
  durationMinutes: number;
  performance: number;
  needMinutes: number;
}

export default function SleepCard({ durationMinutes, performance, needMinutes }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>SLEEP</Text>
      <Text style={styles.value}>{formatDuration(durationMinutes)}</Text>
      <Text style={styles.perf}>
        <Text style={{ color: colors.sleepPurple, fontWeight: '700' }}>{performance}%</Text> of{' '}
        {formatDuration(needMinutes)} need
      </Text>
      <View style={styles.barTrack}>
        <View
          style={[styles.barFill, { width: `${Math.min(performance, 100)}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    flex: 1,
    padding: spacing.card,
  },
  title: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
  },
  perf: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  barTrack: {
    backgroundColor: colors.trackDark,
    borderRadius: 3,
    height: 6,
    marginTop: 12,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: colors.sleepPurple,
    borderRadius: 3,
    height: 6,
  },
});
