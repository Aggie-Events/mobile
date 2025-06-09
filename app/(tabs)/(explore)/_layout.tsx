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
              backgroundColor: "#500000", // darker maroon
            },
            headerTintColor: "#fff", // white text/icons
            headerTitleStyle: {
              fontFamily: "inter",
              color: "#fff",
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}