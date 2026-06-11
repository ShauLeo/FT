import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PressableScale from './PressableScale';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  steps: number;
  calories: number;
  onPressSteps?: () => void;
  onPressCalories?: () => void;
}

export default function StatRow({ steps, calories, onPressSteps, onPressCalories }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <PressableScale style={styles.flex} onPress={onPressSteps} accessibilityLabel="Steps detail">
        <View style={styles.card}>
          <Ionicons name="footsteps" size={18} color={colors.textSecondary} style={styles.icon} />
          <Text style={styles.value}>{steps.toLocaleString('en-US')}</Text>
          <Text style={styles.label}>STEPS</Text>
        </View>
      </PressableScale>
      <PressableScale
        style={styles.flex}
        onPress={onPressCalories}
        accessibilityLabel="Calories detail"
      >
        <View style={styles.card}>
          <Ionicons name="flame" size={18} color={colors.textSecondary} style={styles.icon} />
          <Text style={styles.value}>{calories.toLocaleString('en-US')}</Text>
          <Text style={styles.label}>CALORIES</Text>
        </View>
      </PressableScale>
    </View>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.gap,
    },
    flex: {
      flex: 1,
    },
    card: {
      alignItems: 'center',
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      padding: spacing.card,
    },
    icon: {
      marginBottom: 6,
    },
    value: {
      color: c.textPrimary,
      fontSize: 20,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    label: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
  });
