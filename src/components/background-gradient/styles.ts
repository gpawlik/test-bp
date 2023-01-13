import { Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { hexToRGB } from "~/utils/colors";
import { windowHeight } from "~/utils/platform";
import { getBackgroundColors } from "~/utils/theme";

interface BackgroundImageProps {
  imageWidth: string;
}

export const BackgroundImage = styled.Image<BackgroundImageProps>`
  ${StyleSheet.absoluteFill}
  width: ${({ imageWidth }) => imageWidth ?? "100%"};
  height: ${windowHeight * 1.1}px;
`;

const backgroundColors = getBackgroundColors();
const gradientOpacity = Platform.select({ ios: 0.6, web: 0.6, android: 0.92 });

export const BackgroundLinearGradient = styled(LinearGradient).attrs(
  ({ colors }) => ({
    colors: colors
      ? colors.map((color) => hexToRGB(color, gradientOpacity))
      : [
          hexToRGB(backgroundColors[0].start, gradientOpacity),
          hexToRGB(backgroundColors[1].end, gradientOpacity),
          hexToRGB(backgroundColors[2].end, gradientOpacity),
        ],
  })
)`
  ${StyleSheet.absoluteFill}
`;

export const BackgroundBlurView = styled(BlurView).attrs({
  intensity: 40,
})`
  ${StyleSheet.absoluteFill}
`;
