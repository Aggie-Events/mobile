import { Stack } from "expo-router";
import "../global.css";
import Header from "@/components/ui/Header";
import { verifyInstallation } from 'nativewind';



export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>

  );
}
