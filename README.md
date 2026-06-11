# Fitness Tracker

A demo iOS fitness app that mixes the best features of **Whoop**, **Bevel**, and **Garmin Connect**, built with React Native + Expo.

## Home Dashboard (v1)

- **Recovery ring** (Whoop) — daily recovery % with green/yellow/red status, plus HRV and resting heart rate
- **Sleep card** (Whoop/Bevel) — sleep duration and performance vs. sleep need
- **Strain gauge** (Whoop) — today's strain on the 0–21 scale with an optimal-strain target
- **Body Battery** (Garmin) — energy reserves bar
- **Activity stats** (Garmin) — steps and calories
- **Weekly trend strip** (Bevel) — last 7 days of recovery at a glance

All metrics are mock data (`src/data/mockData.ts`) — no wearable connection yet.

## Run it

```bash
npm install
```

**In the browser (quick demo):**

```bash
npm run web
```

**On your iPhone (real iOS):**

1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store
2. Run `npm start`
3. Scan the QR code with your iPhone camera — the app opens in Expo Go

## Project structure

```
App.tsx                  # Dashboard screen
src/theme.ts             # Colors, spacing, recovery color logic
src/data/mockData.ts     # Mock metrics + 7-day history
src/components/          # Header, RecoveryRing, SleepCard, StrainCard,
                         # BodyBatteryBar, StatRow, WeekTrendStrip
```
