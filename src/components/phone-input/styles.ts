import styled from "styled-components/native";
import { Text } from "react-native";

import { Text1 } from "~/components/text";
import { TextInput } from "~/components/text-input";
import { Icon } from "~/components/icon";

import { colors } from "~/styles/theme";

export const Container = styled.View``;

export const TextBox = styled.View``;

export const IconBox = styled.View`
  padding-top: 34px;
  padding-left: 4px;
`;

export const CaretIcon = styled(Icon)`
  color: ${colors.gray700};
`;

export const PrefixSelector = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  width: 50px;
  flex-direction: row;
`;

export const Input = styled(TextInput)`
  padding-left: 60px;
`;

export const LabelText = styled(Text1)`
  color: ${colors.primaryBlue};
  padding-top: 8px;
  padding-bottom: 5px;
`;

export const SelectorText = styled(Text)`
  font-size: 16px;
  line-height: 20px;
  font-family: SFPro;
  align-self: center;
`;
