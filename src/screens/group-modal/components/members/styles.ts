import styled from "styled-components/native";

import { Text2, Text3 } from "~/components/text";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  background-color: ${colors.gray100};
  border-radius: ${spacers.ss4};
`;

export const Item = styled.View<{ isLast: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${spacers.ss5} ${spacers.ss4};
  border-bottom-width: 1px;
  border-bottom-color: ${({ isLast }) =>
    isLast ? colors.transparent : colors.gray200};
`;

export const TextBox = styled.View`
  flex: 1;
  margin-left: ${spacers.ss4};
`;

export const Name = styled(Text3)``;

export const Role = styled(Text2)`
  font-family: SFProDisplayItalic;
  color: ${colors.gray600};
`;
