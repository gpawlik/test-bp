import styled from "styled-components/native";
import { IconButton } from "react-native-paper";

import { Text3 } from "~/components/text";

import { colors } from "~/styles/theme";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled(Text3)<{ lightBackButtonText?: boolean }>`
  color: ${({ lightBackButtonText }) =>
    lightBackButtonText ? colors.white : colors.primaryBlue};
  font-family: SFProDisplay;
  padding-top: 1px;
`;

export const Icon = styled(IconButton).attrs(
  ({ lightBackButtonIcon }: { lightBackButtonIcon?: boolean }) => ({
    color: lightBackButtonIcon ? colors.white : colors.primaryBlue,
  })
)<{ lightBackButtonIcon?: boolean }>`
  margin-right: 0;
`;
