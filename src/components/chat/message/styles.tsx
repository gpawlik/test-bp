import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { Text3 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

interface Props {
  isReversed: boolean;
}

export const Content = styled(LinearGradient).attrs(
  ({ isReversed }: Props) => ({
    colors: isReversed ? ["#8457E3", "#575AE3"] : [colors.white, colors.white],
    start: { x: 0.5, y: 0 },
  })
)<Props>`
  margin-bottom: ${spacers.ss3};
  border-radius: 8px;
  align-self: ${({ isReversed }) => (isReversed ? "flex-start" : "flex-end")};
`;

export const Text = styled(Text3)<Props>`
  color: ${({ isReversed }) => (isReversed ? colors.white : colors.black)};
  letter-spacing: -0.2px;
  padding: ${spacers.ss5};
`;
