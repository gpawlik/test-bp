import styled from "styled-components/native";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { spacers, colors } from "~/styles/theme";
import { Text2 } from "~/components/text";

export const Container = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${spacers.ss6};
  padding-vertical: ${spacers.ss2};
  background-color: ${colors.white};
`;

export const Content = styled(Animated.View)``;

export const Background = styled(LinearGradient)`
  border-radius: 16px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const LabelBox = styled.View`
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.TouchableOpacity<{ isLast?: boolean }>`
  padding-vertical: ${spacers.ss4};
  padding-horizontal: ${spacers.ss6};
  border-right-width: ${({ isLast }) => (isLast ? 0 : 3)}px;
  border-right-color: ${colors.white};
`;

export const LabelText = styled(Text2)`
  font-family: MontserratMedium;
`;

export const BottomBox = styled.View`
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${spacers.ss6};
  background-color: ${colors.white};
`;

export const MetaBox = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const MetaText = styled(Text2)`
  font-family: Montserrat;
  margin-right: ${spacers.ss2};
`;

export const MetaTextBold = styled(Text2)`
  font-family: MontserratBold;
`;
