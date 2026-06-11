import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenTitle } from '../components/ui';
import { products } from '../data/mockData';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

export default function ShopScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <Screen>
      <ScreenTitle>Shop</ScreenTitle>
      <Text style={styles.subtitle}>Gear and accessories (demo catalog)</Text>
      <View style={styles.grid}>
        {products.map((p) => (
          <Pressable key={p.id} style={styles.tile}>
            {p.tag ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{p.tag}</Text>
              </View>
            ) : null}
            <Text style={styles.icon}>{p.icon}</Text>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.price}>{p.price}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    subtitle: {
      color: c.textSecondary,
      fontSize: 13,
      marginBottom: 4,
      marginTop: -8,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.gap,
    },
    tile: {
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      flexBasis: '47%',
      flexGrow: 1,
      padding: spacing.card,
    },
    tag: {
      alignSelf: 'flex-start',
      backgroundColor: c.accent,
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    tagText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '700',
    },
    icon: {
      fontSize: 30,
      marginBottom: 8,
    },
    name: {
      color: c.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    price: {
      color: c.textSecondary,
      fontSize: 13,
      fontWeight: '600',
      marginTop: 4,
    },
  });
