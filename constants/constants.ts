import { Platform, StatusBar } from "react-native";

export const tabBarHeight = Platform.OS == "ios" ? 60 + 10 : 60;
export const STATUSBAR_HEIGHT = Platform.OS == "ios" ? 47 : StatusBar.currentHeight || 0;
export const eventCardHeight = 140;
