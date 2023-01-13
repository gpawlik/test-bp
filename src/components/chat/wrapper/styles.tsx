import styled from "styled-components/native";

import { Text1 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

interface Props {
  isReversed: boolean;
}

export const Container = styled.View<Props>`
  flex-direction: row;
  ${({ isReversed }) => (isReversed ? null : "align-self:flex-end")};
`;

export const ImageBox = styled.View<Props>`
  margin-right: ${({ isReversed }) => (isReversed ? spacers.ss4 : 0)};
  margin-left: ${({ isReversed }) => (isReversed ? 0 : spacers.ss4)};
  margin-vertical: ${spacers.ss3};
  width: 33px;
`;

export const ContentBox = styled.View`
  flex: 1;
`;

export const ContentWrapper = styled.View<Props>`
  align-self: ${({ isReversed }) => (isReversed ? "flex-start" : "flex-end")};
`;

export const MetaBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${spacers.ss3};
`;

export const MetaText = styled(Text1)<{ isLast: boolean }>`
  justify-content: space-between;
  color: ${colors.gray500};
  margin-right: ${({ isLast }) => (isLast ? 0 : spacers.ss4)};
`;
