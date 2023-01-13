import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Text2, Text2Center, Text3, Text3Center } from "~/components/text";
import { colors, fontSizes, lineHeights, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";

export const QuestionContainer = styled.View`
  margin: ${spacers.ss5} 0;
  padding: ${spacers.ss5};
  background-color: ${colors.gray100};
`;

export const QuestionTitle = styled(Text2)`
  font-family: SFProDisplayBold;
  color: ${colors.gray800};
  letter-spacing: ${pxToNumber(spacers.ss1) / 2}px;
  text-transform: uppercase;
`;

export const QuestionTextWrapper = styled.View`
  flex-direction: row;
  padding: ${spacers.ss5} 0;
`;

export const QuestionGradientSeparator = styled(LinearGradient).attrs({
  colors: ["#2563EB", "#EB9025"],
  start: { x: 0.1, y: 0.2 },
})`
  width: 2px;
`;

export const QuestionText = styled(Text3)`
  font-family: SFPro;
  color: ${colors.gray800};
  letter-spacing: -${pxToNumber(spacers.ss1) / 2}px;
  padding: ${spacers.ss4} ${spacers.ss5};
`;

export const AnswerActionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const AnswerActionText = styled(Text3)`
  font-family: SFPro;
  padding: ${spacers.ss5} ${spacers.ss4};
  color: ${colors.primaryBlue};
  letter-spacing: -${pxToNumber(spacers.ss1) / 3}px;
`;

export const webModalContainerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: pxToNumber(spacers.ss5),
  },
}).container;
