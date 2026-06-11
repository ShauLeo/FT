import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  steps: number;
  calories: number;
}

export default function StatRow({ steps, calories }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.icon}>👟</Text>
        <Text style={styles.value}>{steps.toLocaleString('en-US')}</Text>
        <Text style={styles.label}>STEPS</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.icon}>🔥</Text>
        <Text style={styles.value}>{calories.toLocaleString('en-US')}</Text>
        <Text style={styles.label}>CALORIES</Text>
      </View>
    </View>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.gap,
    },
    card: {
      alignItems: 'center',
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      flex: 1,
      padding: spacing.card,
    },
    icon: {
      fontSize: 18,
      marginBottom: 6,
    },
    value: {
      color: c.textPrimary,
      fontSize: 20,
      fontWeight: '800',
    },
    label: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
  });
