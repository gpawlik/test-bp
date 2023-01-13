import { Platform } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { Text2Center, Text3Center } from "~/components/text";
import { colors, fontSizes, lineHeights, spacers } from "~/styles/theme";
import { isPad } from "~/utils/platform";

export const SessionHomeContent = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SessionLogo = styled(Animated.Image)`
  min-width: 220px;
  resize-mode: contain;
  tint-color: ${colors.white};
`;

export const SessionSeparator = styled(Animated.View)`
  width: 157px;
  opacity: 0.5;
  border: 1px solid ${colors.white};
  margin: ${spacers.ss4};
`;

export const SessionVolume = styled(Text3Center)`
  color: ${colors.white};
  font-family: SFPro;
  line-height: ${lineHeights.lh2};
`;

export const SessionTitle = styled(Text2Center)`
  color: ${colors.white};
  font-family: MontserratBold;
  text-transform: uppercase;
  margin-top: ${spacers.ss4};
`;

export const SessionDay = styled(Animated.Text)`
  color: ${colors.white};
  font-size: ${fontSizes.fs11};
  font-family: MontserratLight;
  margin-top: ${spacers.ss4};
  text-align: center;
`;

export const containerBottomFinalPosition = Platform.select({
  ios: isPad ? 350 : 250,
  android: 210,
  default: 250,
});
