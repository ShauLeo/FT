import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StrainCard from '../components/StrainCard';
import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import { hrZones, today, week, workouts } from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

export default function FitnessScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const maxZoneMinutes = Math.max(...hrZones.map((z) => z.minutes));

  return (
    <Screen>
      <ScreenTitle>Fitness</ScreenTitle>

      <StrainCard strain={today.strain} target={today.strainTarget} />

      <Card>
        <SectionTitle>HEART RATE ZONES · TODAY</SectionTitle>
        {hrZones.map((z, i) => (
          <View key={z.zone} style={styles.zoneRow}>
            <Text style={styles.zoneName}>{z.zone}</Text>
            <View style={styles.zoneTrack}>
              <View
                style={[
                  styles.zoneFill,
                  {
                    width: `${(z.minutes / maxZoneMinutes) * 100}%`,
                    backgroundColor: i >= 3 ? colors.recoveryRed : colors.strainBlue,
                    opacity: 0.45 + (i / hrZones.length) * 0.55,
                  },
                ]}
              />
            </View>
            <Text style={styles.zoneMinutes}>{z.minutes}m</Text>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle>RECENT WORKOUTS</SectionTitle>
        {workouts.map((w, i) => (
          <View
            key={w.id}
            style={[styles.workoutRow, i < workouts.length - 1 && styles.workoutDivider]}
          >
            <Text style={styles.workoutIcon}>{w.icon}</Text>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutType}>{w.type}</Text>
              <Text style={styles.workoutMeta}>
                {w.day} · {w.durationMinutes} min · {w.avgHr} bpm avg
              </Text>
            </View>
            <View style={styles.workoutStats}>
              <Text style={[styles.workoutStrain, { color: colors.strainBlue }]}>
                {w.strain.toFixed(1)}
              </Text>
              <Text style={styles.workoutMeta}>{w.calories} kcal</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle>STRAIN · LAST 7 DAYS</SectionTitle>
        <View style={styles.weekRow}>
          {week.map((d, i) => (
            <View key={d.day + i} style={styles.weekCol}>
              <View style={styles.weekTrack}>
                <View
                  style={[
                    styles.weekFill,
                    {
                      height: (d.strain / 21) * 56,
                      backgroundColor:
                        i === week.length - 1 ? colors.strainBlue : colors.track,
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekValue}>{d.strain.toFixed(1)}</Text>
              <Text style={styles.weekDay}>{d.day}</Text>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    zoneRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 8,
    },
    zoneName: {
      color: c.textSecondary,
      fontSize: 12,
      fontWeight: '600',
      width: 56,
    },
    zoneTrack: {
      backgroundColor: c.track,
      borderRadius: 4,
      flex: 1,
      height: 8,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    zoneFill: {
      borderRadius: 4,
      height: 8,
    },
    zoneMinutes: {
      color: c.textSecondary,
      fontSize: 12,
      textAlign: 'right',
      width: 36,
    },
    workoutRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    workoutDivider: {
      borderBottomColor: c.cardBorder,
      borderBottomWidth: 1,
    },
    workoutIcon: {
      fontSize: 22,
      marginRight: 12,
    },
    workoutInfo: {
      flex: 1,
    },
    workoutType: {
      color: c.textPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
    workoutMeta: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    workoutStats: {
      alignItems: 'flex-end',
    },
    workoutStrain: {
      fontSize: 16,
      fontWeight: '800',
    },
    weekRow: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    weekCol: {
      alignItems: 'center',
      flex: 1,
    },
    weekTrack: {
      height: 56,
      justifyContent: 'flex-end',
    },
    weekFill: {
      borderRadius: 4,
      width: 10,
    },
    weekValue: {
      color: c.textSecondary,
      fontSize: 10,
      fontWeight: '600',
      marginTop: 5,
    },
    weekDay: {
      color: c.textTertiary,
      fontSize: 10,
      marginTop: 2,
    },
  });
