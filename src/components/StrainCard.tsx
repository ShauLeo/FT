import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  strain: number; // 0-21 (Whoop scale)
  target: number;
}

const W = 120;
const STROKE = 10;
const R = (W - STROKE) / 2;
const H = R + STROKE; // half-circle gauge height
const CY = R + STROKE / 2;

// Arc from 180° (left) sweeping clockwise toward 0° (right)
const gaugePath = (fraction: number): string => {
  const f = Math.min(Math.max(fraction, 0.001), 1);
  const angle = Math.PI * (1 - f);
  const endX = W / 2 + R * Math.cos(angle);
  const endY = CY - R * Math.sin(angle);
  return `M ${W / 2 - R} ${CY} A ${R} ${R} 0 0 1 ${endX} ${endY}`;
};

export default function StrainCard({ strain, target }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>STRAIN</Text>
      <View style={styles.gaugeWrap}>
        <Svg width={W} height={H}>
          <Path
            d={gaugePath(1)}
            stroke={colors.track}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d={gaugePath(strain / 21)}
            stroke={colors.strainBlue}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        <Text style={styles.value}>{strain.toFixed(1)}</Text>
      </View>
      <Text style={styles.target}>
        Optimal: <Text style={{ color: colors.strainBlue, fontWeight: '700' }}>{target.toFixed(1)}</Text> / 21
      </Text>
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
    gaugeWrap: {
      alignItems: 'center',
    },
    value: {
      color: c.textPrimary,
      fontSize: 24,
      fontWeight: '800',
      marginTop: -28,
    },
    target: {
      color: c.textSecondary,
      fontSize: 12,
      marginTop: 10,
      textAlign: 'center',
    },
  });
