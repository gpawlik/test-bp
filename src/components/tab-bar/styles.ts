import { BlurView } from "expo-blur";
import { Platform, View } from "react-native";
import styled, { css } from "styled-components/native";

import { Text1 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";
import { hexToRGB } from "~/utils/colors";

export const TAB_BAR_HEIGHT = 60;

export const BarWrapper = styled(Platform.OS === "ios" ? BlurView : View).attrs(
  { intensity: 40 }
)<{ bottom?: number }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ bottom = 0 }) => `${TAB_BAR_HEIGHT + bottom}px`};
  flex-direction: row;
  padding-horizontal: ${spacers.ss4};
  padding-vertical: ${spacers.ss2};
  background-color: ${hexToRGB(
    colors.white,
    Platform.OS === "android" ? 0.9 : 0.7
  )};
  justify-content: space-between;
  padding-bottom: ${({ bottom = 0 }) => `${bottom + 10}px`};

  ${Platform.OS === "web" &&
  css`
    backdrop-filter: blur(7.5px);
  `}
`;

export const TabButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacers.ss5};
  flex: 1;
`;

export const ButtonText = styled(Text1)<{ color?: string }>`
  margin-top: 6px;
  font-size: 10px;
  line-height: 11px;
  color: ${({ color }) => color};
`;
