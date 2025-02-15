import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import "../../global.css";

// import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Header from '@/components/ui/Header';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName="index"

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name='publish'
        options={{
          title: 'Publish',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orgs"
        options={{
          title: 'Organizations',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="drop.fill" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'User Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
