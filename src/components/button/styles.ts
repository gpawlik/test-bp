import styled, { css } from "styled-components/native";

import { Text3 } from "~/components/text";
import { colors, fontSizes, spacers } from "~/styles/theme";

import { ButtonTypes } from "./types";

type Props = {
  type: ButtonTypes;
  disabled: boolean;
  stretch?: boolean;
  pressed?: boolean;
  hasIcon?: boolean;
};

const backgroundColorMap = new Map([
  [ButtonTypes.Primary, colors.gray700],
  [ButtonTypes.Secondary, colors.transparent],
  [ButtonTypes.Outlined, colors.transparent],
  [ButtonTypes.Apple, colors.white],
  [ButtonTypes.Google, colors.white],
]);

const labelColorMap = new Map([
  [ButtonTypes.Primary, colors.white],
  [ButtonTypes.Secondary, colors.gray800],
  [ButtonTypes.Outlined, colors.gray800],
  [ButtonTypes.Apple, colors.black],
  [ButtonTypes.Google, colors.black],
]);

const borderColorMap = new Map([
  [ButtonTypes.Primary, colors.transparent],
  [ButtonTypes.Secondary, colors.transparent],
  [ButtonTypes.Outlined, colors.gray700],
  [ButtonTypes.Apple, colors.white],
  [ButtonTypes.Google, colors.white],
]);

export const pressedStyle = { opacity: 0.9 };

export const PressableWrapper = styled.Pressable<Props>`
  flex-direction: row;
  background-color: ${({ type, disabled }) =>
    disabled ? colors.gray500 : backgroundColorMap.get(type)};
  border: 1px solid ${({ type }) => borderColorMap.get(type)};
  border-radius: 26px;
  min-height: ${({ hasIcon }) => (hasIcon ? 52 : 46)}px;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacers.ss6};
  ${({ stretch }) => (stretch ? "flex: 1;" : "")}
`;

const labelWithIcon = css`
  font-family: SFProDisplayMedium;
  font-size: ${fontSizes.fs2};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Label = styled(Text3)<Props>`
  color: ${({ type, disabled }) =>
    disabled ? colors.white : labelColorMap.get(type)};
  ${({ hasIcon }) => (hasIcon ? labelWithIcon : "")}
`;

export const IconBox = styled.View`
  padding-left: ${spacers.ss3};
`;

export const LeftIconBox = styled.View`
  padding-right: ${spacers.ss4};
`;

export const LoadingBox = styled.View`
  position: absolute;
  top: 12px;
  right: 20px;
`;
