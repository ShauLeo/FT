# Health Data Integration Guide

The app talks to data sources through one interface: `HealthProvider`
(`src/health/types.ts`). Screens read from `activeProvider` (`src/health/index.ts`),
which is currently the mock provider. To go live with a device, implement the
provider and flip `activeProvider` — no screen changes needed.

## Apple Watch (test device) — HealthKit

HealthKit is a native iOS framework. It does **not** work in Expo Go or in the
web preview; it needs a custom development build.

**What you need:**
- An [Expo account](https://expo.dev) (free)
- An [Apple Developer account](https://developer.apple.com) ($99/year) — required
  to install custom builds on a real iPhone
- Your iPhone paired with the Apple Watch (the watch writes its data into the
  iPhone's Health store; the app reads it from there)

**Steps (all run on Windows — EAS builds in the cloud, no Mac needed):**

```bash
npm install -g eas-cli
eas login
npx expo install @kingstinct/react-native-healthkit
```

Add to `app.json`:

```json
"ios": {
  "infoPlist": {
    "NSHealthShareUsageDescription": "Read sleep, heart rate and activity to show your recovery."
  },
  "entitlements": { "com.apple.developer.healthkit": true }
},
"plugins": ["expo-status-bar", "@kingstinct/react-native-healthkit"]
```

Then build and install:

```bash
eas build --profile development --platform ios
```

Finally, implement the queries in `src/health/appleHealthProvider.ts`:
sleepAnalysis (stages), heartRateVariabilitySDNN, restingHeartRate,
respiratoryRate, oxygenSaturation, stepCount, activeEnergyBurned — and map
them to `HealthSnapshot`. Note: Apple provides no recovery/strain scores, so
the app computes those itself from HRV/RHR/sleep (the open-source
[goose](https://github.com/b-nnett/goose) project is a good reference for
score heuristics).

## Whoop — Cloud API

- OAuth 2.0 app via the [Whoop Developer Platform](https://developer.whoop.com)
- REST endpoints for recovery, sleep (with stages), workouts, and cycles —
  Whoop's own scores come precomputed, easiest mapping to our model
- Needs a tiny backend (or serverless function) for the OAuth token exchange
- Alternative, no-cloud path: direct Bluetooth to a WHOOP 5.0 band as done by
  goose (Rust + CoreBluetooth) — significant effort, native-only

## Garmin — Health API

- Apply for the free [Garmin Health API](https://developer.garmin.com/gc-developer-program/health-api/)
  (approval takes a few days)
- Push-based: Garmin POSTs daily summaries, sleep, HRV, Body Battery to your
  webhook — so this one requires a small backend with a public URL

## Fitbit — Web API

- Register an app at [dev.fitbit.com](https://dev.fitbit.com); personal apps can
  use OAuth without review
- REST endpoints for sleep stages, HRV, resting HR, steps, calories

## Strava — workouts import/export

- Register an API app at [developers.strava.com](https://developers.strava.com)
  (free, instant for personal use; rate-limited)
- OAuth 2.0 with `activity:read_all` (import) and `activity:write` (export) scopes
- Import: `GET /api/v3/athlete/activities` → map to `Workout` (type, duration,
  avg HR, calories); Strava has no strain score, so the app derives strain from
  duration × HR zones
- Export: `POST /api/v3/activities` to publish manually logged strength
  sessions to the athlete's Strava feed
- Token exchange needs a small backend or serverless function (same pattern as
  Whoop/Fitbit); on mobile use `expo-auth-session` for the OAuth flow
- UI entry points already exist: Connect/Import/Export buttons on the Fitness
  tab and a Strava row in Settings → Devices

## Coros — Open API

- Request access via the [COROS Open Platform](https://open.coros.com) (approval
  required); OAuth + REST for workouts and daily data
- Fallback: Coros can auto-sync to Apple Health, so the HealthKit provider
  above picks up Coros data for free — same trick works for Garmin and Fitbit

## Practical rollout order

1. **HealthKit first** (Apple Watch test device) — one integration that also
   captures Garmin/Coros/Fitbit data synced into Apple Health.
2. **Whoop cloud API second** — precomputed recovery/strain/sleep scores.
3. Vendor-direct APIs only when you need data the Health store doesn't carry.
