import { Stack } from "expo-router";
import "../globals.css";
import Header from "@/components/ui/Header";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>

  );
}
