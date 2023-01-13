import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacers.ss6};
  padding-vertical: ${spacers.ss4};
  background-color: ${colors.white};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${colors.gray200};
`;

export const Input = styled.TextInput`
  margin-left: ${spacers.ss4};
`;
