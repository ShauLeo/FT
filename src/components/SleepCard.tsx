import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatDuration } from '../data/mockData';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  durationMinutes: number;
  performance: number;
  needMinutes: number;
}

export default function SleepCard({ durationMinutes, performance, needMinutes }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>SLEEP</Text>
      <Text style={styles.value}>{formatDuration(durationMinutes)}</Text>
      <Text style={styles.perf}>
        <Text style={{ color: colors.sleepPurple, fontWeight: '700' }}>{performance}%</Text> of{' '}
        {formatDuration(needMinutes)} need
      </Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.min(performance, 100)}%` }]} />
      </View>
    </View>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      flex: 1,
      padding: spacing.card,
    },
    title: {
      color: c.textTertiary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: 10,
    },
    value: {
      color: c.textPrimary,
      fontSize: 26,
      fontWeight: '800',
    },
    perf: {
      color: c.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    barTrack: {
      backgroundColor: c.track,
      borderRadius: 3,
      height: 6,
      marginTop: 12,
      overflow: 'hidden',
    },
    barFill: {
      backgroundColor: c.sleepPurple,
      borderRadius: 3,
      height: 6,
    },
  });
