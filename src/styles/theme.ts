import { DefaultTheme } from "react-native-paper";

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  neutral200: "#D5DEE4",
  gray50: "#FAFAFA",
  gray100: "#EEEEEE",
  gray200: "#E5E7EB",
  gray300: "#D4D4D8",
  gray400: "#BFBBBA",
  gray500: "#71717A",
  gray600: "#52525B",
  gray700: "#3F3F46",
  gray800: "#27272A",
  warmGray100: "#F5F5F4",
  warmGray500: "#78716C",
  green600: "#16A34A",
  indigo50: "#EEF2FF",
  indigo600: "#4F46E5",
  primaryBlue: "#4F46E5",
  amber50: "#FFFBEB",
  amber300: "#FCD34D",
  amber600: "#D97706",
  emerald600: "#059669",
  red500: "#DD2B0E",
  red600: "#DC2626",
  red700: "#F1583E",
  transparent: "transparent",
  orange: "#EF4444",
} as const;

export type Colors = typeof colors[keyof typeof colors];

export const fontSizes = {
  fs0: "10px",
  fs1: "12px",
  fs2: "14px",
  fs3: "16px",
  fs4: "18px",
  fs5: "20px",
  fs6: "24px",
  fs7: "28px",
  fs8: "32px",
  fs9: "36px",
  fs10: "42px",
  fs11: "48px",
  fs12: "54px",
  fs13: "60px",
  fs14: "68px",
  fs15: "76px",
  fs16: "84px",
  fs17: "92px",
} as const;

export type FontSizes = typeof fontSizes[keyof typeof fontSizes];

export const spacers = {
  ss0: "0px",
  ss1: "1px",
  ss2: "2px",
  ss3: "4px",
  ss4: "8px",
  ss5: "12px",
  ss6: "16px",
  ss7: "20px",
  ss8: "24px",
  ss9: "36px",
  ss10: "48px",
  ss11: "64px",
  ss12: "72px",
} as const;

export type Spacers = typeof spacers[keyof typeof spacers];

export const lineHeights = {
  lh1: "18px",
  lh2: "20px",
  lh3: "22px",
  lh4: "24px",
  lh5: "28px",
  lh6: "40px",
  lh7: "52px",
  lh8: "64px",
  lh9: "76px",
} as const;

export type LineHeights = typeof lineHeights[keyof typeof lineHeights];

export const theme = {
  colors,
  fontSizes,
  spacers,
  lineHeights,
};

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primaryBlue,
    secondary: colors.white,
  },
};

declare module "styled-components/native" {
  export interface Theme {
    colors: typeof colors;
    fontSizes: typeof fontSizes;
    spacers: typeof spacers;
    lineHeights: typeof lineHeights;
  }
}
