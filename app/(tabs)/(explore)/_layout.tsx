import React from "react";
import { Stack } from "expo-router";
import "../../../global.css";

export default function ExploreLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}