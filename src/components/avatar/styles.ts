import styled from "styled-components/native";

import { Text2 } from "~/components/text";
import { colors } from "~/styles/theme";

export const IconBox = styled.View<{ size: number }>`
  background-color: ${colors.orange};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled(Text2)`
  font-family: SFProDisplayMedium;
  color: ${colors.white};
`;
