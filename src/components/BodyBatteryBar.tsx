import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { colors, radius, spacing } from '../theme';

interface Props {
  level: number; // 0-100
}

const BAR_HEIGHT = 14;

export default function BodyBatteryBar({ level }: Props) {
  const clamped = Math.min(Math.max(level, 0), 100);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>BODY BATTERY</Text>
        <Text style={styles.value}>{clamped}</Text>
      </View>
      <View style={styles.barWrap}>
        <Svg width="100%" height={BAR_HEIGHT}>
          <Defs>
            <LinearGradient id="battery" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={colors.batteryLow} />
              <Stop offset="0.5" stopColor={colors.batteryMid} />
              <Stop offset="1" stopColor={colors.batteryHigh} />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height={BAR_HEIGHT}
            rx={BAR_HEIGHT / 2}
            fill={colors.trackDark}
          />
          <Rect
            x="0"
            y="0"
            width={`${clamped}%`}
            height={BAR_HEIGHT}
            rx={BAR_HEIGHT / 2}
            fill="url(#battery)"
          />
        </Svg>
      </View>
      <Text style={styles.hint}>Energy reserves for the rest of your day</Text>
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
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  barWrap: {
    width: '100%',
  },
  hint: {
    color: colors.textTertiary,
    fontSize: 11,
    marginTop: 8,
  },
});
