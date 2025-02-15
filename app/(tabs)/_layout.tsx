import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import "../../global.css";
import { BlurView } from "expo-blur";
import MenuBlur from "@/components/MenuBlur";

// import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from "@/components/ui/IconSymbol";
import Header from "@/components/ui/Header";
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#800000",
        tabBarBackground: () => <MenuBlur />,
        tabBarStyle: {
          margin: 10,
          padding: 10,
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
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
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publish",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orgs"
        options={{
          title: "Organizations",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="drop.fill" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "User Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
