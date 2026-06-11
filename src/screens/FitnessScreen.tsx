import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import StrainCard from '../components/StrainCard';
import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import {
  hrZones,
  lastStrengthSession,
  personalRecords,
  strengthTemplates,
  today,
  week,
  workouts,
} from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

export default function FitnessScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const maxZoneMinutes = Math.max(...hrZones.map((z) => z.minutes));
  const [stravaStatus, setStravaStatus] = useState<string | null>(null);

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
        <SectionTitle>STRENGTH</SectionTitle>
        <View style={styles.templateRow}>
          {strengthTemplates.map((t) => (
            <Pressable key={t.id} style={styles.templateTile} accessibilityLabel={`Start ${t.name}`}>
              <Ionicons name="barbell" size={16} color={colors.strainBlue} />
              <Text style={styles.templateName}>{t.name}</Text>
              <Text style={styles.templateMeta}>{t.exercises.length} exercises</Text>
              <Text style={styles.templateMeta}>{t.lastPerformed}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sessionHead}>
          <Text style={styles.sessionTitle}>{lastStrengthSession.template}</Text>
          <Text style={styles.sessionMeta}>
            {lastStrengthSession.day} · {lastStrengthSession.durationMinutes} min ·{' '}
            {lastStrengthSession.volumeKg.toLocaleString('en-US')} kg volume
          </Text>
        </View>
        {lastStrengthSession.exercises.map((ex) => (
          <View key={ex.name} style={styles.exerciseBlock}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            {ex.sets.map((s, i) => (
              <View key={i} style={styles.setRow}>
                <Text style={styles.setIndex}>{i + 1}</Text>
                <Text style={styles.setValue}>
                  {s.weightKg} kg × {s.reps}
                </Text>
                {s.isPr ? (
                  <View style={styles.prBadge}>
                    <Ionicons name="trophy" size={10} color="#FFFFFF" />
                    <Text style={styles.prText}>PR</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.prSection}>
          <Text style={styles.exerciseName}>Personal records</Text>
          {personalRecords.map((pr) => (
            <View key={pr.exercise} style={styles.setRow}>
              <Text style={[styles.setValue, styles.prExercise]}>{pr.exercise}</Text>
              <Text style={styles.setValue}>
                {pr.weightKg} kg × {pr.reps}
              </Text>
              <Text style={styles.sessionMeta}>{pr.date}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <View style={styles.stravaHead}>
          <SectionTitle>STRAVA</SectionTitle>
          <Text style={styles.stravaState}>Not connected</Text>
        </View>
        <View style={styles.stravaActions}>
          <Pressable
            style={[styles.stravaBtn, { backgroundColor: '#FC4C02' }]}
            accessibilityLabel="Connect Strava"
            onPress={() => setStravaStatus('Strava OAuth requires an API app — see docs/HEALTH_INTEGRATION.md')}
          >
            <Ionicons name="link" size={14} color="#FFFFFF" />
            <Text style={styles.stravaBtnText}>Connect</Text>
          </Pressable>
          <Pressable
            style={styles.stravaBtnSecondary}
            accessibilityLabel="Import workouts from Strava"
            onPress={() => setStravaStatus('Connect Strava first to import activities.')}
          >
            <Ionicons name="download" size={14} color={colors.textPrimary} />
            <Text style={styles.stravaBtnSecondaryText}>Import</Text>
          </Pressable>
          <Pressable
            style={styles.stravaBtnSecondary}
            accessibilityLabel="Export workouts to Strava"
            onPress={() => setStravaStatus('Connect Strava first to export workouts.')}
          >
            <Ionicons name="share-outline" size={14} color={colors.textPrimary} />
            <Text style={styles.stravaBtnSecondaryText}>Export</Text>
          </Pressable>
        </View>
        {stravaStatus ? <Text style={styles.stravaStatus}>{stravaStatus}</Text> : null}
      </Card>

      <Card>
        <SectionTitle>RECENT WORKOUTS</SectionTitle>
        {workouts.map((w, i) => (
          <View
            key={w.id}
            style={[styles.workoutRow, i < workouts.length - 1 && styles.workoutDivider]}
          >
            <View style={styles.workoutIconWrap}>
              <Ionicons name={w.icon as any} size={18} color={colors.strainBlue} />
            </View>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutType}>{w.type}</Text>
              <Text style={styles.workoutMeta}>
                {w.day} · {w.durationMinutes} min · {w.avgHr} bpm avg
                {w.source === 'strava' ? '  ·  via Strava' : ''}
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
    workoutIconWrap: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 18,
      height: 36,
      justifyContent: 'center',
      marginRight: 12,
      width: 36,
    },
    templateRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 14,
    },
    templateTile: {
      backgroundColor: c.track,
      borderRadius: 12,
      flex: 1,
      gap: 2,
      padding: 10,
    },
    templateName: {
      color: c.textPrimary,
      fontSize: 12,
      fontWeight: '700',
      marginTop: 4,
    },
    templateMeta: {
      color: c.textTertiary,
      fontSize: 10,
    },
    sessionHead: {
      borderTopColor: c.cardBorder,
      borderTopWidth: 1,
      paddingTop: 12,
    },
    sessionTitle: {
      color: c.textPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
    sessionMeta: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    exerciseBlock: {
      marginTop: 12,
    },
    exerciseName: {
      color: c.textSecondary,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 6,
    },
    setRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      paddingVertical: 3,
    },
    setIndex: {
      color: c.textTertiary,
      fontSize: 12,
      fontVariant: ['tabular-nums'],
      width: 14,
    },
    setValue: {
      color: c.textPrimary,
      fontSize: 13,
      fontVariant: ['tabular-nums'],
    },
    prExercise: {
      flex: 1,
    },
    prBadge: {
      alignItems: 'center',
      backgroundColor: c.recoveryGreen,
      borderRadius: 8,
      flexDirection: 'row',
      gap: 3,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    prText: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '800',
    },
    prSection: {
      borderTopColor: c.cardBorder,
      borderTopWidth: 1,
      marginTop: 14,
      paddingTop: 12,
    },
    stravaHead: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stravaState: {
      color: c.textTertiary,
      fontSize: 11,
      marginBottom: 10,
    },
    stravaActions: {
      flexDirection: 'row',
      gap: 8,
    },
    stravaBtn: {
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      gap: 6,
      justifyContent: 'center',
      minHeight: 44,
      paddingHorizontal: 16,
    },
    stravaBtnText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '700',
    },
    stravaBtnSecondary: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 6,
      justifyContent: 'center',
      minHeight: 44,
      paddingHorizontal: 16,
    },
    stravaBtnSecondaryText: {
      color: c.textPrimary,
      fontSize: 13,
      fontWeight: '600',
    },
    stravaStatus: {
      color: c.recoveryYellow,
      fontSize: 11,
      marginTop: 10,
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
