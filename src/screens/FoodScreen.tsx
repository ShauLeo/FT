import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import { calorieTarget, macros, meals } from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

export default function FoodScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const eaten = meals.reduce((sum, m) => sum + m.calories, 0);
  const remaining = Math.max(calorieTarget - eaten, 0);

  const macroRows = [
    { name: 'Protein', value: macros.proteinG, target: macros.proteinTargetG, color: colors.recoveryGreen },
    { name: 'Carbs', value: macros.carbsG, target: macros.carbsTargetG, color: colors.strainBlue },
    { name: 'Fat', value: macros.fatG, target: macros.fatTargetG, color: colors.recoveryYellow },
  ];

  return (
    <Screen>
      <ScreenTitle>Food</ScreenTitle>

      <Card>
        <SectionTitle>CALORIES</SectionTitle>
        <View style={styles.calorieRow}>
          <View style={styles.calorieCell}>
            <Text style={styles.calorieValue}>{eaten.toLocaleString('en-US')}</Text>
            <Text style={styles.calorieLabel}>EATEN</Text>
          </View>
          <View style={styles.calorieCell}>
            <Text style={[styles.calorieValue, { color: colors.recoveryGreen }]}>
              {remaining.toLocaleString('en-US')}
            </Text>
            <Text style={styles.calorieLabel}>REMAINING</Text>
          </View>
          <View style={styles.calorieCell}>
            <Text style={styles.calorieValue}>{calorieTarget.toLocaleString('en-US')}</Text>
            <Text style={styles.calorieLabel}>TARGET</Text>
          </View>
        </View>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min((eaten / calorieTarget) * 100, 100)}%`,
                backgroundColor: colors.recoveryGreen,
              },
            ]}
          />
        </View>
      </Card>

      <Card>
        <SectionTitle>MACROS</SectionTitle>
        {macroRows.map((m) => (
          <View key={m.name} style={styles.macroRow}>
            <Text style={styles.macroName}>{m.name}</Text>
            <View style={styles.barTrackInline}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${Math.min((m.value / m.target) * 100, 100)}%`,
                    backgroundColor: m.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.macroValue}>
              {m.value}/{m.target}g
            </Text>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle>TODAY'S MEALS</SectionTitle>
        {meals.map((m, i) => (
          <View key={m.id} style={[styles.mealRow, i < meals.length - 1 && styles.mealDivider]}>
            <View style={styles.mealIconWrap}>
              <Ionicons name={m.icon as any} size={16} color={colors.textSecondary} />
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{m.name}</Text>
              <Text style={styles.mealTime}>{m.time}</Text>
            </View>
            <Text style={styles.mealCalories}>{m.calories} kcal</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    calorieRow: {
      flexDirection: 'row',
      marginBottom: 14,
    },
    calorieCell: {
      alignItems: 'center',
      flex: 1,
    },
    calorieValue: {
      color: c.textPrimary,
      fontSize: 20,
      fontWeight: '800',
    },
    calorieLabel: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
    barTrack: {
      backgroundColor: c.track,
      borderRadius: 4,
      height: 8,
      overflow: 'hidden',
    },
    barTrackInline: {
      backgroundColor: c.track,
      borderRadius: 4,
      flex: 1,
      height: 8,
      marginHorizontal: 10,
      overflow: 'hidden',
    },
    barFill: {
      borderRadius: 4,
      height: 8,
    },
    macroRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },
    macroName: {
      color: c.textSecondary,
      fontSize: 13,
      fontWeight: '600',
      width: 60,
    },
    macroValue: {
      color: c.textSecondary,
      fontSize: 12,
      textAlign: 'right',
      width: 72,
    },
    mealRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    mealDivider: {
      borderBottomColor: c.cardBorder,
      borderBottomWidth: 1,
    },
    mealIconWrap: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      marginRight: 12,
      width: 32,
    },
    mealInfo: {
      flex: 1,
    },
    mealName: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '600',
    },
    mealTime: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    mealCalories: {
      color: c.textSecondary,
      fontSize: 13,
      fontWeight: '600',
    },
  });
