import React from "react";
import { Stack } from "expo-router";
import "../../../global.css";

export default function ExploreLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="event/[id]"
          options={{
            headerTitle: "Event Details",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}