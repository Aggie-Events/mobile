import { Stack } from "expo-router";
import "../global.css";
import Toast from 'react-native-toast-message';
import React, { useEffect } from "react";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthProvider from "@/components/auth/AuthProvider";

export const logo = require('../assets/images/logo.png');


export default function RootLayout() {

  return (
    <GestureHandlerRootView style = {{ flex: 1, height: '100%' }}>
      <BottomSheetModalProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
          </Stack>
          <Toast />
        </AuthProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>

  );
}
