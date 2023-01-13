import { colors } from "~/styles/theme";

export function pxToNumber(px: string): number {
  return Number(px.replace("px", ""));
}

export enum HeaderColorSchemes {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}

export function getColorSchemeType(): HeaderColorSchemes {
  const date = new Date();
  const hour = date.getHours();

  const isMorning = hour > 4 && hour < 12;
  const isAfternoon = hour >= 12 && hour <= 17;

  if (isMorning) return HeaderColorSchemes.Morning;

  if (isAfternoon) return HeaderColorSchemes.Afternoon;

  return HeaderColorSchemes.Evening;
}

export function getElementColorBasedOnDayTime() {
  const colorSchemeType = getColorSchemeType();

  return colorSchemeType === HeaderColorSchemes.Evening
    ? colors.white
    : colors.black;
}

type BackgroundColorScheme = Array<{ start: string; end: string }>;

export function getBackgroundColors(): BackgroundColorScheme {
  const colorSchemeType = getColorSchemeType();

  if (colorSchemeType === HeaderColorSchemes.Morning) {
    return [
      { start: "#FFA666", end: "#FF2E00" },
      { start: "#FFF066", end: "#FF2E00" },
      { start: "#FF974C", end: "#FFE68B" },
    ];
  }

  if (colorSchemeType === HeaderColorSchemes.Afternoon) {
    return [
      { start: "#4CE5EF", end: "#86CD4F" },
      { start: "#4CE5EF", end: "#86CD4F" },
      { start: "#4CE5EF", end: "#86CD4F" },
    ];
  }

  return [
    { start: "#001561", end: "#2924FF" },
    { start: "#001561", end: "#8F00FF" },
    { start: "#001561", end: "#8F00FF" },
  ];
}
