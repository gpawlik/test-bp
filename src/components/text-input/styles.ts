import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { Icon } from "~/components/icon";
import { Text2 } from "~/components/text";

import { colors, spacers, fontSizes, lineHeights } from "~/styles/theme";

export const styles = StyleSheet.create({
  input: {
    fontSize: 16.5,
    lineHeight: 23,
    color: colors.black,
    fontFamily: "SFPro",
  },
});

export const Container = styled.View`
  flex-direction: row;
  margin-vertical: ${spacers.ss3};
`;

export const Input = styled(TextInput)`
  font-size: ${fontSizes.fs3};
  line-height: ${lineHeights.lh3};
  background-color: ${colors.transparent};
  color: ${colors.black};
  letter-spacing: -0.4px;
  font-family: SFProDisplay;
  flex: 1;
`;

export const MaskedInputContainer = styled.View`
  padding-top: 19px;
  padding-left: 14px;
`;

export const IconButton = styled.TouchableOpacity`
  margin-top: ${spacers.ss3};
  margin-left: ${spacers.ss4};
  position: absolute;
  bottom: 20px;
  right: 0px;
`;

export const StyledIcon = styled(Icon)<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? colors.black : colors.gray700)};
  width: 22px;
  height: 22px;
`;

export const ErrorMessage = styled(Text2)`
  color: ${colors.red500};
  margin-top: ${spacers.ss2};
  font-family: Roboto;
`;

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
