import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { Text3 } from "~/components/text";
import { isAndroid, isWeb } from "~/utils/platform";
import { colors } from "~/styles/theme";

import { AvatarSize } from "./types";

interface Props {
  size: AvatarSize;
}

const sizeMap = new Map([
  [AvatarSize.Small, 32],
  [AvatarSize.Medium, 48],
  [AvatarSize.Large, 88],
]);

const textSizeMap = new Map([
  [AvatarSize.Small, 14],
  [AvatarSize.Medium, 16],
  [AvatarSize.Large, 24],
]);

const containerStyle = css<Props>`
  width: ${({ size }) => sizeMap.get(size)}px;
  height: ${({ size }) => sizeMap.get(size)}px;
  border-radius: 44px;
  background-color: ${colors.gray300};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Container = styled.View`
  ${containerStyle}
`;

export const GradientContainer = styled(LinearGradient).attrs({
  colors: isWeb || isAndroid ? ["#F08E12", "#D53E1B"] : ["#D53E1B", "#F08E12"],
  start: isAndroid ? { x: 0.7, y: 0.7 } : { x: 0.1, y: 0.7 },
})<Props>`
  ${containerStyle}
`;

export const Text = styled(Text3)<Props>`
  font-size: ${({ size }) => textSizeMap.get(size)}px;
  font-family: SFProDisplayMedium;
  color: ${colors.white};
`;

export const AvatarImage = styled.Image<Props>`
  width: ${({ size }) => sizeMap.get(size)}px;
  height: ${({ size }) => sizeMap.get(size)}px;
`;
