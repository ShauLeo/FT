import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import PressableScale from '../components/PressableScale';
import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import { providers } from '../health';
import { Palette } from '../theme';
import { ThemeMode, useTheme } from '../ThemeContext';

const MODES: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export default function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const navigation = useNavigation<any>();

  return (
    <Screen>
      <ScreenTitle>Settings</ScreenTitle>

      <Card>
        <SectionTitle>APPEARANCE</SectionTitle>
        <View style={styles.segment}>
          {MODES.map((m) => {
            const active = mode === m.value;
            return (
              <Pressable
                key={m.value}
                onPress={() => setMode(m.value)}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {m.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <SectionTitle>DEVICES & DATA SOURCES</SectionTitle>
        <PressableScale
          accessibilityLabel="Connect a device"
          onPress={() => navigation.navigate('ConnectDevice')}
        >
          <View style={styles.connectRow}>
            <View style={styles.connectIconWrap}>
              <Ionicons name="add" size={20} color={colors.accent} />
            </View>
            <View style={styles.connectInfo}>
              <Text style={styles.connectTitle}>Connect device</Text>
              <Text style={styles.connectMeta}>
                {providers.length} sources: Apple Watch, Whoop, Garmin, Coros, Fitbit, Strava
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </View>
        </PressableScale>
        <Text style={styles.note}>
          The app currently shows demo data. Apple Watch (HealthKit) is the first planned live
          source — see docs/HEALTH_INTEGRATION.md.
        </Text>
      </Card>

      <Card>
        <SectionTitle>ABOUT</SectionTitle>
        <Text style={styles.note}>
          Fitness Tracker demo — the aessence.co companion app, mixing Whoop, Bevel and Garmin
          features. Metric models inspired by the open-source goose project
          (github.com/b-nnett/goose).
        </Text>
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    segment: {
      backgroundColor: c.track,
      borderRadius: 12,
      flexDirection: 'row',
      padding: 3,
    },
    segmentItem: {
      alignItems: 'center',
      borderRadius: 10,
      flex: 1,
      minHeight: 38,
      justifyContent: 'center',
    },
    segmentItemActive: {
      backgroundColor: c.card,
    },
    segmentText: {
      color: c.textSecondary,
      fontSize: 13,
      fontWeight: '600',
    },
    segmentTextActive: {
      color: c.textPrimary,
    },
    connectRow: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: 48,
    },
    connectIconWrap: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 18,
      height: 36,
      justifyContent: 'center',
      marginRight: 12,
      width: 36,
    },
    connectInfo: {
      flex: 1,
    },
    connectTitle: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    connectMeta: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    note: {
      color: c.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 10,
    },
  });
