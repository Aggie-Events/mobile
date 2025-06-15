import React from "react";
import { Stack } from "expo-router";
import "../../../global.css";
import { headerOptions } from "@/constants/constants";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="myEvents" options={{...headerOptions, headerTitle: "My Events"}} />
      <Stack.Screen name="myOrgs" options={{...headerOptions, headerTitle: "My Organizations"}} />
    </Stack>
  );
}