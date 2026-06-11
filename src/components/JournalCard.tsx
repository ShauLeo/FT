import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, SectionTitle } from './ui';
import { journal as journalData, JournalEntry } from '../data/mockData';
import { Palette } from '../theme';
import { useTheme } from '../ThemeContext';

export default function JournalCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [entries, setEntries] = useState<JournalEntry[]>(journalData);

  const answer = (id: string, value: boolean) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, answered: value } : e))
    );
  };

  return (
    <Card>
      <SectionTitle>DAILY JOURNAL</SectionTitle>
      {entries.map((e, i) => (
        <View
          key={e.id}
          style={[styles.row, i < entries.length - 1 && styles.divider]}
        >
          <View style={styles.textCol}>
            <Text style={styles.question}>{e.question}</Text>
            <Text style={styles.impact}>{e.impact}</Text>
          </View>
          <View style={styles.toggles}>
            {([true, false] as const).map((v) => {
              const active = e.answered === v;
              return (
                <Pressable
                  key={String(v)}
                  onPress={() => answer(e.id, v)}
                  hitSlop={6}
                  accessibilityLabel={`${e.question} ${v ? 'yes' : 'no'}`}
                  style={[styles.toggle, active && styles.toggleActive]}
                >
                  <Ionicons
                    name={v ? 'checkmark' : 'close'}
                    size={16}
                    color={active ? '#FFFFFF' : colors.textTertiary}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <Text style={styles.hint}>
        Answers correlate with your recovery over time, like Whoop's journal insights.
      </Text>
    </Card>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    divider: {
      borderBottomColor: c.cardBorder,
      borderBottomWidth: 1,
    },
    textCol: {
      flex: 1,
      paddingRight: 10,
    },
    question: {
      color: c.textPrimary,
      fontSize: 13,
      fontWeight: '600',
    },
    impact: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 2,
    },
    toggles: {
      flexDirection: 'row',
      gap: 8,
    },
    toggle: {
      alignItems: 'center',
      backgroundColor: c.track,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      width: 32,
    },
    toggleActive: {
      backgroundColor: c.accent,
    },
    hint: {
      color: c.textTertiary,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 10,
    },
  });
