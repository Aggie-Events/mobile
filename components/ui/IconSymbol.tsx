// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "paperplane.fill": "send",
  "calendar": "calendar-today",
  "plus.circle.fill": "add-circle-outline",
  "building.2": "business",
  "gearshape.fill": "settings",

  // --- Add these for settings ---
  "globe": "public", // Sign In with Google
  "rectangle.portrait.and.arrow.right": "logout", // Sign Out
  "bell": "notifications-none", // Notifications
  "moon": "dark-mode", // Dark Mode
  "envelope": "mail-outline", // Email Updates
  "person.crop.circle": "person-outline", // Edit Profile
  "lock.shield": "security", // Security
  "hand.raised": "privacy-tip", // Privacy
  "questionmark.circle": "help-outline", // Help Center
  "doc.text": "description", // Terms of Service
  "shield": "privacy-tip", // Privacy Policy
  // Chevron for navigation
  "chevron.right": "chevron-right",
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
