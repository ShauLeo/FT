import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import WhoopAgeCard from '../components/WhoopAgeCard';
import {
  formatDuration,
  healthRanges,
  sleepCoach,
  sleepDetail,
  today,
  week,
  whoopAge,
} from '../data/mockData';
import { Palette, recoveryColor } from '../theme';
import { useTheme } from '../ThemeContext';

const STAGE_COLORS = (c: Palette) => ({
  Awake: c.textTertiary,
  Light: c.strainBlue,
  REM: c.sleepPurple,
  Deep: c.recoveryGreen,
});

export default function BiologyScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const stages = [
    { name: 'Awake' as const, minutes: sleepDetail.stages.awakeMinutes },
    { name: 'Light' as const, minutes: sleepDetail.stages.lightMinutes },
    { name: 'REM' as const, minutes: sleepDetail.stages.remMinutes },
    { name: 'Deep' as const, minutes: sleepDetail.stages.deepMinutes },
  ];
  const totalStageMinutes = stages.reduce((sum, s) => sum + s.minutes, 0);
  const stageColors = STAGE_COLORS(colors);

  const vitals = [
    { label: 'HRV', value: `${today.hrv} ms` },
    { label: 'RESTING HR', value: `${today.restingHr} bpm` },
    { label: 'RESP. RATE', value: `${sleepDetail.respiratoryRate} /min` },
    { label: 'SPO2', value: `${sleepDetail.spo2}%` },
    { label: 'WRIST TEMP', value: `${sleepDetail.wristTempDeltaC > 0 ? '+' : ''}${sleepDetail.wristTempDeltaC}°C` },
    { label: 'HR DIP', value: `${sleepDetail.hrDipPercent}%` },
  ];

  return (
    <Screen>
      <ScreenTitle>Biology</ScreenTitle>

      <Card>
        <SectionTitle>LAST NIGHT'S SLEEP</SectionTitle>
        <View style={styles.sleepHeadline}>
          <View>
            <Text style={styles.bigValue}>{formatDuration(today.sleep.durationMinutes)}</Text>
            <Text style={styles.muted}>
              {sleepDetail.bedtime} → {sleepDetail.wakeTime} · fell asleep in{' '}
              {sleepDetail.timeToFallAsleepMinutes}m
            </Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={[styles.scoreValue, { color: colors.sleepPurple }]}>
              {sleepDetail.score}
            </Text>
            <Text style={styles.muted}>SCORE</Text>
          </View>
        </View>

        {/* Stage distribution bar */}
        <View style={styles.stageBar}>
          {stages.map((s) => (
            <View
              key={s.name}
              style={{
                backgroundColor: stageColors[s.name],
                flex: s.minutes / totalStageMinutes,
              }}
            />
          ))}
        </View>
        <View style={styles.stageLegend}>
          {stages.map((s) => (
            <View key={s.name} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: stageColors[s.name] }]} />
              <Text style={styles.legendText}>
                {s.name} {formatDuration(s.minutes)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.debtRow}>
          <Text style={styles.muted}>Sleep debt</Text>
          <Text style={[styles.debtValue, { color: colors.recoveryYellow }]}>
            {formatDuration(sleepDetail.sleepDebtMinutes)}
          </Text>
        </View>
      </Card>

      <Card>
        <SectionTitle>SLEEP COACH</SectionTitle>
        <View style={styles.coachRow}>
          <View style={styles.coachCell}>
            <Ionicons name="moon" size={16} color={colors.sleepPurple} />
            <Text style={styles.coachValue}>{sleepCoach.recommendedBedtime}</Text>
            <Text style={styles.coachLabel}>BEDTIME</Text>
          </View>
          <View style={styles.coachCell}>
            <Ionicons name="sunny" size={16} color={colors.recoveryYellow} />
            <Text style={styles.coachValue}>{sleepCoach.recommendedWake}</Text>
            <Text style={styles.coachLabel}>WAKE</Text>
          </View>
          <View style={styles.coachCell}>
            <Ionicons name="flag" size={16} color={colors.accent} />
            <Text style={styles.coachValue}>{sleepCoach.goal}</Text>
            <Text style={styles.coachLabel}>GOAL</Text>
          </View>
        </View>
        <Text style={styles.coachHint}>
          In bed by {sleepCoach.recommendedBedtime} tonight meets your{' '}
          {formatDuration(sleepCoach.sleepNeedMinutes)} sleep need to {sleepCoach.goal.toLowerCase()}{' '}
          tomorrow.
        </Text>
      </Card>

      <WhoopAgeCard age={whoopAge} />

      <Card>
        <SectionTitle>HEALTH MONITOR</SectionTitle>
        {healthRanges.map((r) => {
          const inRange = r.value >= r.low && r.value <= r.high;
          const pct = Math.min(Math.max((r.value - r.low) / (r.high - r.low), 0), 1);
          return (
            <View key={r.metric} style={styles.rangeRow}>
              <Text style={styles.rangeMetric}>{r.metric}</Text>
              <View style={styles.rangeTrack}>
                <View
                  style={[
                    styles.rangeMarker,
                    {
                      left: `${pct * 100}%`,
                      backgroundColor: inRange ? colors.recoveryGreen : colors.recoveryRed,
                    },
                  ]}
                />
              </View>
              <Text style={styles.rangeValue}>
                {r.value}
                {r.unit === '%' ? '%' : ` ${r.unit}`}
              </Text>
              <Ionicons
                name={inRange ? 'checkmark-circle' : 'alert-circle'}
                size={16}
                color={inRange ? colors.recoveryGreen : colors.recoveryRed}
              />
            </View>
          );
        })}
        <Text style={styles.coachHint}>
          Markers show where you sit inside your personal 30-day baseline range.
        </Text>
      </Card>

      <Card>
        <SectionTitle>RECOVERY VITALS</SectionTitle>
        <View style={styles.vitalsGrid}>
          {vitals.map((v) => (
            <View key={v.label} style={styles.vitalCell}>
              <Text style={styles.vitalValue}>{v.value}</Text>
              <Text style={styles.vitalLabel}>{v.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle>SLEEP · LAST 7 DAYS</SectionTitle>
        <View style={styles.weekRow}>
          {week.map((d, i) => (
            <View key={d.day + i} style={styles.weekCol}>
              <View style={styles.weekTrack}>
                <View
                  style={[
                    styles.weekFill,
                    {
                      height: Math.min(d.sleepHours / 9, 1) * 56,
                      backgroundColor:
                        i === week.length - 1 ? colors.sleepPurple : colors.track,
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekHours}>{d.sleepHours.toFixed(1)}</Text>
              <Text style={styles.weekDay}>{d.day}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle>TODAY'S RECOVERY</SectionTitle>
        <Text style={[styles.bigValue, { color: recoveryColor(today.recovery, colors) }]}>
          {today.recovery}%
        </Text>
        <Text style={styles.muted}>
          Based on HRV, resting heart rate, respiratory rate and sleep performance.
        </Text>
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    sleepHeadline: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    bigValue: {
      color: c.textPrimary,
      fontSize: 30,
      fontWeight: '800',
    },
    muted: {
      color: c.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    scoreBadge: {
      alignItems: 'center',
    },
    scoreValue: {
      fontSize: 30,
      fontWeight: '800',
    },
    stageBar: {
      borderRadius: 5,
      flexDirection: 'row',
      height: 10,
      overflow: 'hidden',
    },
    stageLegend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 10,
    },
    legendItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    legendDot: {
      borderRadius: 4,
      height: 8,
      width: 8,
    },
    legendText: {
      color: c.textSecondary,
      fontSize: 11,
    },
    debtRow: {
      alignItems: 'center',
      borderTopColor: c.cardBorder,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
      paddingTop: 12,
    },
    debtValue: {
      fontSize: 16,
      fontWeight: '700',
    },
    coachRow: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    coachCell: {
      alignItems: 'center',
      flex: 1,
      gap: 4,
    },
    coachValue: {
      color: c.textPrimary,
      fontSize: 18,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    coachLabel: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
    },
    coachHint: {
      color: c.textTertiary,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
    },
    rangeRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    rangeMetric: {
      color: c.textSecondary,
      fontSize: 12,
      fontWeight: '600',
      width: 78,
    },
    rangeTrack: {
      backgroundColor: c.track,
      borderRadius: 3,
      flex: 1,
      height: 6,
    },
    rangeMarker: {
      borderRadius: 6,
      height: 12,
      marginLeft: -6,
      marginTop: -3,
      position: 'absolute',
      top: '50%',
      width: 12,
    },
    rangeValue: {
      color: c.textPrimary,
      fontSize: 12,
      fontWeight: '700',
      fontVariant: ['tabular-nums'],
      textAlign: 'right',
      width: 64,
    },
    vitalsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    vitalCell: {
      paddingVertical: 8,
      width: '33.33%',
    },
    vitalValue: {
      color: c.textPrimary,
      fontSize: 16,
      fontWeight: '700',
    },
    vitalLabel: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 0.8,
      marginTop: 2,
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
    weekHours: {
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
