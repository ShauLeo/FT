import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Screen, SectionTitle } from '../components/ui';
import { aessenceBenefits, aessenceTiers } from '../data/mockData';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

export default function ShopScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [selected, setSelected] = useState('athlete');

  return (
    <Screen>
      {/* Aessence hero */}
      <View style={styles.hero}>
        <Text style={styles.brandWordmark}>
          aessence<Text style={{ color: colors.brand }}>.</Text>
        </Text>
        <Text style={styles.heroTitle}>Train like you have a professional team behind you</Text>
        <Text style={styles.heroSub}>
          A personal supplement formula and training program, built from your goals and your data.
        </Text>
        <Pressable
          style={styles.quizBtn}
          accessibilityLabel="Start the aessence quiz"
          onPress={() => Linking.openURL('https://aessence.co/')}
        >
          <Text style={styles.quizBtnText}>Build my formula</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.quizHint}>2-minute quiz · 40,000+ formulas built · 4.9★</Text>
      </View>

      {aessenceTiers.map((tier) => {
        const active = selected === tier.id;
        return (
          <Pressable
            key={tier.id}
            onPress={() => setSelected(tier.id)}
            accessibilityLabel={`Select ${tier.name} plan`}
          >
            <Card
              style={{
                borderColor: active ? colors.brand : colors.cardBorder,
                borderWidth: active ? 2 : 1,
              }}
            >
              <View style={styles.tierHead}>
                <View style={styles.tierTitleRow}>
                  <Text style={styles.tierName}>{tier.name}</Text>
                  {tier.popular ? (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.priceCol}>
                  <Text style={styles.tierPrice}>{tier.pricePerMonth}</Text>
                  <Text style={styles.perMonth}>/month</Text>
                </View>
              </View>
              <Text style={styles.tierTagline}>{tier.tagline}</Text>
              {tier.features.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={14} color={colors.brand} />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </Card>
          </Pressable>
        );
      })}

      <Card>
        <SectionTitle>WHY AESSENCE</SectionTitle>
        {aessenceBenefits.map((b) => (
          <View key={b.text} style={styles.benefitRow}>
            <Ionicons name={b.icon as any} size={16} color={colors.brand} />
            <Text style={styles.benefitText}>{b.text}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    hero: {
      backgroundColor: c.card,
      borderColor: c.cardBorder,
      borderRadius: radius.card,
      borderWidth: 1,
      padding: spacing.card + 4,
    },
    brandWordmark: {
      color: c.textPrimary,
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: 0.5,
      marginBottom: 12,
    },
    heroTitle: {
      color: c.textPrimary,
      fontSize: 22,
      fontWeight: '800',
      lineHeight: 28,
    },
    heroSub: {
      color: c.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 8,
    },
    quizBtn: {
      alignItems: 'center',
      backgroundColor: c.brand,
      borderRadius: 12,
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'center',
      marginTop: 16,
      minHeight: 48,
    },
    quizBtnText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '700',
    },
    quizHint: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 10,
      textAlign: 'center',
    },
    tierHead: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tierTitleRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    tierName: {
      color: c.textPrimary,
      fontSize: 18,
      fontWeight: '800',
    },
    popularBadge: {
      backgroundColor: c.brand,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    popularText: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 0.6,
    },
    priceCol: {
      alignItems: 'flex-end',
    },
    tierPrice: {
      color: c.textPrimary,
      fontSize: 18,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    perMonth: {
      color: c.textTertiary,
      fontSize: 11,
    },
    tierTagline: {
      color: c.textSecondary,
      fontSize: 12,
      marginBottom: 10,
      marginTop: 2,
    },
    featureRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 3,
    },
    featureText: {
      color: c.textSecondary,
      fontSize: 13,
    },
    benefitRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      paddingVertical: 6,
    },
    benefitText: {
      color: c.textSecondary,
      flex: 1,
      fontSize: 13,
      lineHeight: 18,
    },
  });
