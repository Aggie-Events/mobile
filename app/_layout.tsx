import { Stack } from "expo-router";
import "../global.css";
import Toast from 'react-native-toast-message';
import React from "react";




export default function RootLayout() {
  return (
    <>
      {/* <Header /> TODO: decide if we want the header to always show */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
      </Stack>
      <Toast />
    </>

  );
}
