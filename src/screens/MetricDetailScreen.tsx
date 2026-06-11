import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LineChart from '../components/LineChart';
import { Card, Screen, SectionTitle } from '../components/ui';
import { MetricId, metricChange7d, metrics } from '../data/metrics';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

type Params = { MetricDetail: { metricId: MetricId } };

export default function MetricDetailScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const route = useRoute<RouteProp<Params, 'MetricDetail'>>();
  const metric = metrics[route.params?.metricId ?? 'hrv'];

  const color = colors[metric.colorKey] as string;
  const change = metricChange7d(metric);
  const rising = change >= 0;
  const changeIsGood =
    metric.goodDirection === 'range' ? null : (metric.goodDirection === 'up') === rising;
  const changeColor =
    changeIsGood === null
      ? colors.textSecondary
      : changeIsGood
        ? colors.recoveryGreen
        : colors.recoveryRed;

  const last7 = metric.series.slice(-7);
  const fmt = (v: number) =>
    metric.decimals === 0 ? Math.round(v).toLocaleString('en-US') : v.toFixed(metric.decimals);

  return (
    <Screen>
      <Card>
        <View style={styles.headRow}>
          <View style={[styles.iconWrap, { backgroundColor: colors.track }]}>
            <Ionicons name={metric.icon as any} size={20} color={color} />
          </View>
          <View style={styles.headText}>
            <Text style={styles.name}>{metric.name}</Text>
            <Text style={styles.period}>LAST 30 DAYS</Text>
          </View>
        </View>
        <View style={styles.valueRow}>
          <Text style={[styles.value, { color }]}>
            {fmt(metric.current)}
            <Text style={styles.unit}>{metric.unit ? ` ${metric.unit}` : ''}</Text>
          </Text>
          <View style={styles.changeBadge}>
            <Ionicons
              name={rising ? 'trending-up' : 'trending-down'}
              size={14}
              color={changeColor}
            />
            <Text style={[styles.changeText, { color: changeColor }]}>
              {Math.abs(change).toFixed(1)}% vs last week
            </Text>
          </View>
        </View>
        <LineChart data={metric.series} color={color} />
      </Card>

      <Card>
        <SectionTitle>LAST 7 DAYS</SectionTitle>
        <View style={styles.weekRow}>
          {last7.map((v, i) => {
            const lo = Math.min(...last7);
            const hi = Math.max(...last7);
            const h = hi === lo ? 0.6 : 0.25 + ((v - lo) / (hi - lo)) * 0.75;
            return (
              <View key={i} style={styles.weekCol}>
                <View style={styles.weekTrack}>
                  <View
                    style={[
                      styles.weekFill,
                      {
                        height: h * 52,
                        backgroundColor: i === last7.length - 1 ? color : colors.track,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.weekValue}>{fmt(v)}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      <Card>
        <View style={styles.insightRow}>
          <Ionicons name="sparkles" size={14} color={color} />
          <Text style={styles.insightText}>{metric.insight}</Text>
        </View>
      </Card>

      <Card>
        <View style={styles.infoHead}>
          <Ionicons name="information-circle" size={16} color={colors.textSecondary} />
          <Text style={styles.infoTitle}>What is {metric.name.toLowerCase()}?</Text>
        </View>
        <Text style={styles.infoBody}>{metric.info}</Text>
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    headRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      marginBottom: 14,
    },
    iconWrap: {
      alignItems: 'center',
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      width: 40,
    },
    headText: {
      flex: 1,
    },
    name: {
      color: c.textPrimary,
      fontSize: 17,
      fontWeight: '700',
    },
    period: {
      color: c.textTertiary,
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 1,
      marginTop: 2,
    },
    valueRow: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    value: {
      fontSize: 36,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    unit: {
      color: c.textSecondary,
      fontSize: 16,
      fontWeight: '600',
    },
    changeBadge: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 5,
      paddingBottom: 6,
    },
    changeText: {
      fontSize: 12,
      fontWeight: '700',
      fontVariant: ['tabular-nums'],
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
      height: 52,
      justifyContent: 'flex-end',
    },
    weekFill: {
      borderRadius: 4,
      width: 12,
    },
    weekValue: {
      color: c.textSecondary,
      fontSize: 9,
      fontVariant: ['tabular-nums'],
      marginTop: 5,
    },
    insightRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    insightText: {
      color: c.textPrimary,
      flex: 1,
      fontSize: 13,
      lineHeight: 19,
    },
    infoHead: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 6,
      marginBottom: 8,
    },
    infoTitle: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    infoBody: {
      color: c.textSecondary,
      fontSize: 13,
      lineHeight: 20,
    },
  });
