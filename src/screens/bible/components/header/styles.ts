import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text3, Text6 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.amber50};
`;

export const LeftBox = styled.View`
  width: ${spacers.ss5};
`;

export const TextBox = styled.View`
  flex: 1;
  padding: ${spacers.ss8};
`;

export const Intro = styled(Text3)`
  margin-bottom: ${spacers.ss3};
  color: ${colors.gray700};
  font-family: LoraItalic;
`;

export const Title = styled(Text6)`
  color: ${colors.gray800};
  font-family: MontserratBold;
  font-size: 48px;
`;

export const Gradient = styled(LinearGradient)`
  ${StyleSheet.absoluteFill}
`;
