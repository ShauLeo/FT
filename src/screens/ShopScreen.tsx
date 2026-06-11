import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import PressableScale from '../components/PressableScale';
import { Card, Screen, SectionTitle } from '../components/ui';
import { aessenceBenefits, aessenceTiers, aessenceWelcomeBundle } from '../data/mockData';
import { Palette, radius, spacing } from '../theme';
import { useTheme } from '../ThemeContext';

export default function ShopScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [selected, setSelected] = useState('athlete');

  const openQuiz = () => Linking.openURL('https://aessence.co/');

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
        <PressableScale accessibilityLabel="Start the aessence quiz" onPress={openQuiz}>
          <View style={styles.quizBtn}>
            <Text style={styles.quizBtnText}>Build my formula</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </PressableScale>
        <Text style={styles.quizHint}>
          ✓ No card required · ✓ 2 minutes · ✓ 30-day guarantee
        </Text>
      </View>

      {aessenceTiers.map((tier) => {
        const active = selected === tier.id;
        return (
          <PressableScale
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
                  {tier.badge ? (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>{tier.badge}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              {/* Website pricing: per-day hero, per-month below */}
              <View style={styles.priceRow}>
                <Text style={styles.dayPrice}>{tier.pricePerDay}</Text>
                <Text style={styles.dayUnit}>/ day</Text>
              </View>
              <Text style={styles.monthPrice}>
                {tier.pricePerMonth} / month · cancel anytime
              </Text>
              <Text style={styles.tierTagline}>{tier.tagline}</Text>
              {tier.features.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={14} color={colors.brand} />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
              {active ? (
                <PressableScale accessibilityLabel={`Start ${tier.name}`} onPress={openQuiz}>
                  <View style={styles.startBtn}>
                    <Text style={styles.startBtnText}>Start {tier.name}</Text>
                  </View>
                </PressableScale>
              ) : null}
            </Card>
          </PressableScale>
        );
      })}

      <Card style={{ borderColor: colors.brand, borderStyle: 'dashed' }}>
        <View style={styles.bundleHead}>
          <Ionicons name="gift" size={18} color={colors.brand} />
          <Text style={styles.bundleTitle}>Welcome Value Bonus</Text>
          <View style={styles.bundleValueBadge}>
            <Text style={styles.bundleValueText}>{aessenceWelcomeBundle.value} FREE</Text>
          </View>
        </View>
        <Text style={styles.bundleItems}>{aessenceWelcomeBundle.items.join(' · ')}</Text>
        <Text style={styles.bundleNote}>{aessenceWelcomeBundle.note}</Text>
      </Card>

      <Card>
        <SectionTitle>WHY AESSENCE</SectionTitle>
        {aessenceBenefits.map((b) => (
          <View key={b.text} style={styles.benefitRow}>
            <Ionicons name={b.icon as any} size={16} color={colors.brand} />
            <Text style={styles.benefitText}>{b.text}</Text>
          </View>
        ))}
        <View style={styles.guaranteeRow}>
          <Ionicons name="shield-checkmark" size={14} color={colors.recoveryGreen} />
          <Text style={styles.guaranteeText}>30-day money-back guarantee</Text>
        </View>
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
    priceRow: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 4,
      marginTop: 8,
    },
    dayPrice: {
      color: c.textPrimary,
      fontSize: 30,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    dayUnit: {
      color: c.textSecondary,
      fontSize: 14,
      fontWeight: '600',
      paddingBottom: 4,
    },
    monthPrice: {
      color: c.textTertiary,
      fontSize: 12,
      marginTop: 2,
    },
    tierTagline: {
      color: c.textSecondary,
      fontSize: 12,
      marginBottom: 10,
      marginTop: 8,
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
    startBtn: {
      alignItems: 'center',
      backgroundColor: c.brand,
      borderRadius: 12,
      justifyContent: 'center',
      marginTop: 12,
      minHeight: 46,
    },
    startBtnText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    bundleHead: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    bundleTitle: {
      color: c.textPrimary,
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
    },
    bundleValueBadge: {
      backgroundColor: c.brand,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    bundleValueText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '800',
    },
    bundleItems: {
      color: c.textSecondary,
      fontSize: 12,
      marginTop: 8,
    },
    bundleNote: {
      color: c.textTertiary,
      fontSize: 11,
      marginTop: 4,
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
    guaranteeRow: {
      alignItems: 'center',
      borderTopColor: c.cardBorder,
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: 8,
      marginTop: 10,
      paddingTop: 12,
    },
    guaranteeText: {
      color: c.textSecondary,
      fontSize: 12,
      fontWeight: '600',
    },
  });
