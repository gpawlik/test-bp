import Svg from "react-native-svg";
import styled from "styled-components/native";

import { Text7 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const gradientColors = {
  start0: "#FFF",
  stop0: "#FBD8CE",
  start1: "#FFF",
  stop1: "#F2573D",
};

export const BackgroundWrapper = styled.View<{ isShort: boolean }>`
  position: absolute;
  bottom: ${({ isShort }) => (isShort ? 100 : 50)}px;
  left: 0;
  top: 0;
  right: 0;
`;

export const BackgroundContainer = styled(Svg)`
  width: 100%;
  height: 100%;
`;

export const Gradient = styled.View`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.red700};
`;

export const Container = styled.View`
  flex: 1;
`;

export const TopContainer = styled.View<{ hasBackButton: boolean }>`
  padding-top: ${({ hasBackButton }) => (hasBackButton ? 60 : 80)}px;
  padding-bottom: 30px;
  flex: 1;
`;

export const BottomContainer = styled.View<{ isShort: boolean }>`
  justify-content: center;
  height: ${({ isShort }) => (isShort ? 0 : 150)}px;
`;

export const Content = styled.View`
  padding-horizontal: ${spacers.ss8};
  flex: 1;
`;

export const Title = styled(Text7)`
  margin-bottom: ${spacers.ss6};
`;

export const InputBox = styled.View`
  margin-bottom: ${spacers.ss8};
`;

export const ButtonBox = styled.View`
  margin-bottom: ${spacers.ss5};
`;
