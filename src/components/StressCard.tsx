import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, SectionTitle } from './ui';
import { StressToday } from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  stress: StressToday;
}

const MAX_BAR = 44;

export default function StressCard({ stress }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const levelColor = (level: number) =>
    level >= 2.5 ? colors.recoveryRed : level >= 1.5 ? colors.recoveryYellow : colors.stressPurple;

  return (
    <Card>
      <SectionTitle>STRESS MONITOR</SectionTitle>
      <View style={styles.headRow}>
        <View>
          <Text style={[styles.score, { color: levelColor(stress.current) }]}>
            {stress.current.toFixed(1)}
          </Text>
          <Text style={styles.scale}>0–3 SCALE</Text>
        </View>
        <View style={styles.headRight}>
          <Text style={[styles.label, { color: levelColor(stress.current) }]}>{stress.label}</Text>
          <Text style={styles.sub}>{stress.nonActivityShare}% non-activity stress</Text>
        </View>
      </View>
      <View style={styles.timeline}>
        {stress.timeline.map((p) => (
          <View key={p.hour} style={styles.barCol}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { height: (p.level / 3) * MAX_BAR, backgroundColor: levelColor(p.level) },
                ]}
              />
            </View>
            <Text style={styles.hour}>{p.hour}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    headRow: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    headRight: {
      alignItems: 'flex-end',
    },
    score: {
      fontSize: 32,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    scale: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    sub: {
      color: c.textSecondary,
      fontSize: 11,
      marginTop: 4,
    },
    timeline: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    barCol: {
      alignItems: 'center',
      flex: 1,
    },
    barTrack: {
      height: MAX_BAR,
      justifyContent: 'flex-end',
    },
    barFill: {
      borderRadius: 3,
      width: 8,
    },
    hour: {
      color: c.textTertiary,
      fontSize: 9,
      marginTop: 5,
    },
  });
