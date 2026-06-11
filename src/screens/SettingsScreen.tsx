import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Screen, ScreenTitle, SectionTitle } from '../components/ui';
import { providers } from '../health';
import { Palette } from '../theme';
import { ThemeMode, useTheme } from '../ThemeContext';

const MODES: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const DEVICE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'apple-health': 'watch',
  whoop: 'fitness',
  garmin: 'navigate',
  coros: 'compass',
  fitbit: 'pulse',
  strava: 'trail-sign',
};

export default function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      providers.map(async (p) => [p.id, await p.isAvailable()] as const)
    ).then((entries) => {
      if (!cancelled) setAvailability(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onConnect = async (id: string) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    try {
      await provider.connect();
      setStatusMessage(`${provider.name} connected.`);
    } catch (e) {
      setStatusMessage(e instanceof Error ? e.message : 'Connection failed.');
    }
  };

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
        {providers.map((p, i) => {
          const available = availability[p.id] ?? false;
          return (
            <View
              key={p.id}
              style={[styles.deviceRow, i < providers.length - 1 && styles.deviceDivider]}
            >
              <View style={styles.deviceIconWrap}>
                <Ionicons
                  name={DEVICE_ICONS[p.id] ?? 'radio'}
                  size={16}
                  color={colors.textSecondary}
                />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{p.name}</Text>
                <Text style={styles.deviceMeta}>
                  {p.transport} · {available ? 'available' : 'needs setup'}
                </Text>
              </View>
              <Pressable style={styles.connectBtn} onPress={() => onConnect(p.id)}>
                <Text style={styles.connectText}>Connect</Text>
              </Pressable>
            </View>
          );
        })}
        {statusMessage ? <Text style={styles.status}>{statusMessage}</Text> : null}
        <Text style={styles.note}>
          The app currently shows demo data. Apple Watch (HealthKit) is the first planned
          live source — it needs a custom iOS build via EAS. Whoop, Garmin, Coros and
          Fitbit connect through their cloud APIs. See docs/HEALTH_INTEGRATION.md.
        </Text>
      </Card>

      <Card>
        <SectionTitle>ABOUT</SectionTitle>
        <Text style={styles.note}>
          Fitness Tracker demo — a Whoop × Bevel × Garmin feature mix built with Expo.
          Metric models inspired by the open-source goose project (github.com/b-nnett/goose).
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
      paddingVertical: 8,
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
    deviceRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    deviceDivider: {
      borderBottomColor: c.cardBorder,
      borderBottomWidth: 1,
    },
    deviceIconWrap: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      marginRight: 12,
      width: 32,
    },
    deviceInfo: {
      flex: 1,
    },
    deviceName: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    deviceMeta: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    connectBtn: {
      backgroundColor: c.accent,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 7,
    },
    connectText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
    status: {
      color: c.recoveryYellow,
      fontSize: 12,
      marginTop: 10,
    },
    note: {
      color: c.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 10,
    },
  });
