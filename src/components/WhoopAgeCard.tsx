import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, SectionTitle } from './ui';
import { WhoopAge } from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  age: WhoopAge;
  /** Compact: headline only (Home). Full: includes drivers (Biology). */
  compact?: boolean;
}

export default function WhoopAgeCard({ age, compact }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const yearsYounger = age.chronologicalAge - age.physiologicalAge;

  return (
    <Card>
      <SectionTitle>BIOLOGICAL AGE</SectionTitle>
      <View style={styles.headRow}>
        <View>
          <Text style={[styles.bigAge, { color: colors.recoveryGreen }]}>
            {age.physiologicalAge.toFixed(1)}
          </Text>
          <Text style={styles.ageLabel}>PHYSIOLOGICAL</Text>
        </View>
        <View style={styles.vsCol}>
          <Ionicons name="trending-down" size={20} color={colors.recoveryGreen} />
          <Text style={styles.delta}>
            {yearsYounger.toFixed(1)} yrs younger
          </Text>
        </View>
        <View style={styles.rightCol}>
          <Text style={styles.chronAge}>{age.chronologicalAge}</Text>
          <Text style={styles.ageLabel}>ACTUAL</Text>
        </View>
      </View>
      <View style={styles.paceRow}>
        <Text style={styles.paceLabel}>Pace of aging</Text>
        <Text style={[styles.paceValue, { color: colors.recoveryGreen }]}>
          {age.paceOfAging.toFixed(2)}×
        </Text>
      </View>
      {!compact &&
        age.drivers.map((d) => (
          <View key={d.label} style={styles.driverRow}>
            <Ionicons
              name={d.impact === 'positive' ? 'arrow-down-circle' : 'arrow-up-circle'}
              size={16}
              color={d.impact === 'positive' ? colors.recoveryGreen : colors.recoveryYellow}
            />
            <View style={styles.driverText}>
              <Text style={styles.driverLabel}>{d.label}</Text>
              <Text style={styles.driverDetail}>{d.detail}</Text>
            </View>
          </View>
        ))}
    </Card>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    headRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    bigAge: {
      fontSize: 38,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    chronAge: {
      color: c.textSecondary,
      fontSize: 38,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
      textAlign: 'right',
    },
    ageLabel: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
    vsCol: {
      alignItems: 'center',
    },
    delta: {
      color: c.textSecondary,
      fontSize: 11,
      fontWeight: '600',
      marginTop: 2,
    },
    rightCol: {
      alignItems: 'flex-end',
    },
    paceRow: {
      alignItems: 'center',
      borderTopColor: c.cardBorder,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    paceLabel: {
      color: c.textSecondary,
      fontSize: 13,
    },
    paceValue: {
      fontSize: 15,
      fontWeight: '700',
      fontVariant: ['tabular-nums'],
    },
    driverRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      marginTop: 12,
    },
    driverText: {
      flex: 1,
    },
    driverLabel: {
      color: c.textPrimary,
      fontSize: 13,
      fontWeight: '600',
    },
    driverDetail: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 1,
    },
  });
