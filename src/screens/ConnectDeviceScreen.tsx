import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PressableScale from '../components/PressableScale';
import { Screen } from '../components/ui';
import { providers } from '../health';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

const DEVICE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'apple-health': 'watch',
  whoop: 'fitness',
  garmin: 'navigate',
  coros: 'compass',
  fitbit: 'pulse',
  strava: 'trail-sign',
};

/**
 * Strava-style device picker: a 2-column grid of provider tiles
 * (6 per page) instead of a long settings list.
 */
export default function ConnectDeviceScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(providers.map(async (p) => [p.id, await p.isAvailable()] as const)).then(
      (entries) => {
        if (!cancelled) setAvailability(Object.fromEntries(entries));
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const onConnect = async (id: string) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    try {
      await provider.connect();
      setStatus(`${provider.name} connected.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Connection failed.');
    }
  };

  return (
    <Screen>
      <Text style={styles.lead}>
        Choose where your health and workout data comes from. You can connect more than one
        source.
      </Text>
      <View style={styles.grid}>
        {providers.map((p) => {
          const available = availability[p.id] ?? false;
          return (
            <PressableScale
              key={p.id}
              style={styles.tile}
              accessibilityLabel={`Connect ${p.name}`}
              onPress={() => onConnect(p.id)}
            >
              <View style={styles.tileInner}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={DEVICE_ICONS[p.id] ?? 'radio'}
                    size={26}
                    color={colors.textPrimary}
                  />
                </View>
                <Text style={styles.tileName}>{p.name}</Text>
                <Text style={styles.tileMeta}>{p.transport}</Text>
                <View
                  style={[
                    styles.stateBadge,
                    { backgroundColor: available ? colors.recoveryGreen : colors.track },
                  ]}
                >
                  <Text
                    style={[
                      styles.stateText,
                      { color: available ? '#FFFFFF' : colors.textSecondary },
                    ]}
                  >
                    {available ? 'Available' : 'Needs setup'}
                  </Text>
                </View>
              </View>
            </PressableScale>
          );
        })}
      </View>
      {status ? (
        <View style={styles.statusCard}>
          <Ionicons name="information-circle" size={16} color={colors.recoveryYellow} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      ) : null}
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    lead: {
      color: c.textSecondary,
      fontSize: 13,
      lineHeight: 19,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.gap,
    },
    tile: {
      flexBasis: '47%',
      flexGrow: 1,
    },
    tileInner: {
      alignItems: 'center',
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      padding: spacing.card,
    },
    iconWrap: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 28,
      height: 56,
      justifyContent: 'center',
      marginBottom: 10,
      width: 56,
    },
    tileName: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    tileMeta: {
      color: c.textTertiary,
      fontSize: 10,
      marginTop: 2,
      textAlign: 'center',
    },
    stateBadge: {
      borderRadius: 8,
      marginTop: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    stateText: {
      fontSize: 10,
      fontWeight: '700',
    },
    statusCard: {
      alignItems: 'center',
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 8,
      padding: spacing.card,
    },
    statusText: {
      color: c.textSecondary,
      flex: 1,
      fontSize: 12,
      lineHeight: 17,
    },
  });
