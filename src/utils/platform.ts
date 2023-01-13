import { Dimensions, Platform, PlatformIOSStatic } from "react-native";

export const isWeb = Platform.OS === "web";
export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export const isPad = (Platform as PlatformIOSStatic).isPad;
export const windowHeight = Dimensions.get("window").height;
export const windowWidth = Dimensions.get("window").width;
