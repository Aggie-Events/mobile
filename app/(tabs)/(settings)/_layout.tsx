import React from "react";
import { Stack } from "expo-router";
import "../../../global.css";

export default function ExploreLayout() {
  const headerOptions = {
    headerTitle: "My Events",
    headerStyle: {
      backgroundColor: "#500000", // darker maroon
    },
    headerTintColor: "#fff", // white text/icons
    headerTitleStyle: {
      fontFamily: "inter",
      color: "#fff",
    },
    headerShadowVisible: false,
  };
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="myEvents" options={headerOptions} />
        <Stack.Screen name="myOrgs" options={headerOptions} />
      </Stack>
    </>
  );
}