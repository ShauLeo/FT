import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  data: number[];
  color: string;
  height?: number;
  /** Label under the left/right edge of the x-axis */
  startLabel?: string;
  endLabel?: string;
}

const W = 320;

export default function LineChart({
  data,
  color,
  height = 120,
  startLabel = '30 days ago',
  endLabel = 'Today',
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = (max - min) * 0.15 || 1;
  const lo = min - pad;
  const hi = max + pad;

  const pt = (v: number, i: number) => ({
    x: (i / (data.length - 1)) * (W - 8) + 4,
    y: height - 6 - ((v - lo) / (hi - lo)) * (height - 12),
  });

  const points = data.map(pt);
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;
  const last = points[points.length - 1];

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.25" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d={area} fill="url(#area)" />
        <Path d={line} stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
        <Circle cx={last.x} cy={last.y} r={4.5} fill={color} />
      </Svg>
      <View style={styles.axis}>
        <Text style={styles.axisLabel}>{startLabel}</Text>
        <Text style={styles.axisLabel}>{endLabel}</Text>
      </View>
    </View>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    axis: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    axisLabel: {
      color: c.textTertiary,
      fontSize: 10,
    },
  });
