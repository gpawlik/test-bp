import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Text2Center, Text3, Text3Center } from "~/components/text";
import { colors, fontSizes, lineHeights, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";

export const AnswerHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: 0 ${spacers.ss4};
`;

const AnswerHeaderButton = styled.TouchableOpacity`
  width: 100px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding: ${spacers.ss4} ${spacers.ss5};
  border-radius: 42px;
`;

export const AnswerButtonText = styled(Text3Center)`
  font-family: SFPro;
  color: ${colors.gray800};
  line-height: ${lineHeights.lh3};
`;

export const AnswerDoneButton = styled(AnswerHeaderButton)`
  background-color: ${colors.gray200};
`;

export const AnswerCancelButton = styled(AnswerHeaderButton)``;

export const AnswerTitle = styled(Text2Center)`
  flex: 1;
  font-family: SFPro;
  justify-self: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AnswerDivider = styled(View)`
  border: ${StyleSheet.hairlineWidth}px solid ${colors.gray300};
  margin: ${spacers.ss5} 0;
`;

export const AnswerQuestionContent = styled(Text3)`
  font-family: SFPro;
  color: ${colors.gray800};
  letter-spacing: -${pxToNumber(spacers.ss1) / 2}px;
  padding: ${spacers.ss3} ${spacers.ss5};
`;

export const AnswerInput = styled.TextInput.attrs({
  placeholderTextColor: colors.gray500,
})`
  height: 200px;
  padding: ${spacers.ss3} ${spacers.ss5};
  font-size: ${fontSizes.fs3};
`;
