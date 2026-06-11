import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Palette, radius, recoveryColor, recoveryLabel, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  score: number; // 0-100
  hrv: number;
  restingHr: number;
}

const SIZE = 190;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function RecoveryRing({ score, hrv, restingHr }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const color = recoveryColor(score, colors);
  const progress = Math.min(Math.max(score, 0), 100) / 100;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>RECOVERY</Text>
      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke={colors.track}
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke={color}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE}`}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
        <View style={styles.center}>
          <Text style={[styles.score, { color }]}>{score}%</Text>
          <Text style={[styles.label, { color }]}>{recoveryLabel(score)}</Text>
        </View>
      </View>
      <View style={styles.subRow}>
        <View style={styles.subItem}>
          <Text style={styles.subValue}>{hrv} ms</Text>
          <Text style={styles.subLabel}>HRV</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.subItem}>
          <Text style={styles.subValue}>{restingHr} bpm</Text>
          <Text style={styles.subLabel}>RESTING HR</Text>
        </View>
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
      padding: spacing.card,
      alignItems: 'center',
    },
    title: {
      alignSelf: 'flex-start',
      color: c.textTertiary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    ringWrap: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    score: {
      fontSize: 44,
      fontWeight: '800',
    },
    label: {
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 2,
      marginTop: 2,
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    subItem: {
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    subValue: {
      color: c.textPrimary,
      fontSize: 16,
      fontWeight: '700',
    },
    subLabel: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
    divider: {
      backgroundColor: c.cardBorder,
      height: 28,
      width: 1,
    },
  });
