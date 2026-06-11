import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

interface Props {
  userName: string;
  summary: string;
}

export default function Header({ userName, summary }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dateLabel.toUpperCase()}</Text>
      <Text style={styles.greeting}>Good morning, {userName}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.gap,
    },
    date: {
      color: c.textTertiary,
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 1.2,
      marginBottom: 4,
    },
    greeting: {
      color: c.textPrimary,
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 8,
    },
    summary: {
      color: c.textSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
  });
