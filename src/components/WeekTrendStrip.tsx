import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DayMetrics } from '../data/mockData';
import { colors, radius, recoveryColor, spacing } from '../theme';

interface Props {
  days: DayMetrics[];
}

const MAX_BAR_HEIGHT = 56;

export default function WeekTrendStrip({ days }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>RECOVERY · LAST 7 DAYS</Text>
      <View style={styles.bars}>
        {days.map((d, i) => {
          const isToday = i === days.length - 1;
          return (
            <View key={d.day + i} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: (d.recovery / 100) * MAX_BAR_HEIGHT,
                      backgroundColor: recoveryColor(d.recovery),
                      opacity: isToday ? 1 : 0.55,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>{d.day}</Text>
            </View>
          );
        })}
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
    padding: spacing.card,
  },
  title: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  bars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    height: MAX_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  barFill: {
    borderRadius: 4,
    width: 10,
  },
  dayLabel: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
  },
  todayLabel: {
    color: colors.textPrimary,
  },
});
