import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

/** Scrollable screen body with phone-width content column. */
export function Screen({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function ScreenTitle({ children }: { children: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return <Text style={styles.screenTitle}>{children}</Text>;
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    scroll: {
      backgroundColor: c.background,
      flex: 1,
    },
    content: {
      alignSelf: 'center',
      gap: spacing.gap,
      maxWidth: 430,
      padding: spacing.screen,
      paddingBottom: 40,
      width: '100%',
    },
    card: {
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      padding: spacing.card,
    },
    sectionTitle: {
      color: c.textTertiary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: 10,
    },
    screenTitle: {
      color: c.textPrimary,
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 4,
    },
  });
