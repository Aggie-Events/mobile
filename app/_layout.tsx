import { Stack } from "expo-router";
import "../global.css";
import Toast from 'react-native-toast-message';
import React, { useEffect } from "react";
import { Image } from "react-native";

export const logo = require('../assets/images/logo.png');


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
