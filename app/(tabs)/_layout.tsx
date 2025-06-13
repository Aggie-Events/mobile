import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";
import "../../global.css";

// import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from "@/components/ui/IconSymbol";
import Header from "@/components/ui/Header";
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { tabBarHeight } from "@/constants/constants";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#800000",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          height: tabBarHeight,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="(explore)"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publish",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="orgs"
        options={{
          title: "Orgs",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="building.2" color={color} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
