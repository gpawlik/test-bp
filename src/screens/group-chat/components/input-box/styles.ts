import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacers.ss3};
`;

export const Input = styled.View`
  flex: 1;
  height: 36px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${colors.gray400};
  background-color: ${colors.gray50};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding-horizontal: ${spacers.ss4};
`;

export const ActionButton = styled.TouchableOpacity`
  padding: ${spacers.ss5};
`;
