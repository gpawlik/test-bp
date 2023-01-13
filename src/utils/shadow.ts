import { Platform } from "react-native";

interface CreateShadowParams {
  color: string;
  opacity: number;
  radius: number;
  offsetWidth: number;
  offsetHeight: number;
  elevation: number;
}

export function createShadow({
  color,
  opacity,
  radius,
  offsetWidth,
  offsetHeight,
  elevation,
}: CreateShadowParams) {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: {
        width: offsetWidth,
        height: offsetHeight,
      },
    },
    android: {
      elevation,
    },
    web: {
      boxShadow: `${offsetWidth}px ${offsetHeight}px ${radius}px ${color}`,
    },
  });
}
