import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';

interface Props {
  userName: string;
  summary: string;
}

export default function Header({ userName, summary }: Props) {
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

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.gap,
  },
  date: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
