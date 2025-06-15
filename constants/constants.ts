import { Platform, StatusBar } from "react-native";

export const tabBarHeight = Platform.OS == "ios" ? 60 + 10 : 60;
export const STATUSBAR_HEIGHT = Platform.OS == "ios" ? 47 : 0; // Assume no safe area on Android
export const eventCardHeight = 140;
export const defaultImage = require('../assets/images/default-event-image.png');

export const headerOptions = {
  headerTitle: "Header Title",
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
