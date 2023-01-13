import styled from "styled-components/native";

import { Text2, Text3 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Container = styled.View<{ isLast: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacers.ss6} ${spacers.ss7};
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: ${colors.gray200};
`;

export const Content = styled.View`
  padding-horizontal: ${spacers.ss4};
  flex: 1;
`;

export const Title = styled(Text2)``;
