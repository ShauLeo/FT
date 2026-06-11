import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MetricId, metrics } from './src/data/metrics';
import BiologyScreen from './src/screens/BiologyScreen';
import ConnectDeviceScreen from './src/screens/ConnectDeviceScreen';
import FitnessScreen from './src/screens/FitnessScreen';
import FoodScreen from './src/screens/FoodScreen';
import HomeScreen from './src/screens/HomeScreen';
import MetricDetailScreen from './src/screens/MetricDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ShopScreen from './src/screens/ShopScreen';
import { ThemeProvider, useTheme } from './src/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Maps web URLs to screens so reloads and deep links land correctly.
// Cast: react-navigation's LinkingOptions can't infer nested navigator params here.
const linking: any = {
  prefixes: [],
  config: {
    screens: {
      Tabs: {
        screens: {
          Home: 'Home',
          Fitness: 'Fitness',
          Biology: 'Biology',
          Food: 'Food',
          Shop: 'Shop',
          Settings: 'Settings',
        },
      },
      MetricDetail: 'metric/:metricId',
      ConnectDevice: 'connect-device',
    },
  },
};

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Fitness: 'barbell',
  Biology: 'pulse',
  Food: 'restaurant',
  Shop: 'cart',
  Settings: 'settings',
};

function Tabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.cardBorder,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse'} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fitness" component={FitnessScreen} />
      <Tab.Screen name="Biology" component={BiologyScreen} />
      <Tab.Screen name="Food" component={FoodScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { colors, isDark } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      border: colors.cardBorder,
      text: colors.textPrimary,
      primary: colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="MetricDetail"
          component={MetricDetailScreen}
          options={({ route }) => ({
            title: metrics[(route.params as { metricId?: MetricId })?.metricId ?? 'hrv'].name,
          })}
        />
        <Stack.Screen
          name="ConnectDevice"
          component={ConnectDeviceScreen}
          options={{ title: 'Connect device' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
