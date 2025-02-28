import { Stack } from "expo-router";
import "../global.css";
import Header from "@/components/ui/Header";
import Toast from 'react-native-toast-message';




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
