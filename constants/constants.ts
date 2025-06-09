import { Platform, StatusBar } from "react-native";

export const tabBarHeight = Platform.OS == "ios" ? 60 + 10 : 60;
export const STATUSBAR_HEIGHT = Platform.OS == "ios" ? 47 : 0; // Assume no safe area on Android
export const eventCardHeight = 140;
export const defaultEventImage = require('../assets/images/default-event-image.png');
