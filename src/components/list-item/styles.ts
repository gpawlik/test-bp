import styled from "styled-components/native";

import { Text2, Text3 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Container = styled.TouchableOpacity<{ isLast: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacers.ss6} ${spacers.ss7};
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: ${colors.gray200};
`;

export const SideBox = styled.View`
  padding-right: ${spacers.ss5};
`;

export const Content = styled.View`
  flex: 1;
  padding-right: ${spacers.ss4};
`;

export const Title = styled(Text3)`
  font-family: SFProDisplayMedium;
  margin-bottom: ${spacers.ss2};
`;

export const Description = styled(Text2)`
  color: ${colors.gray500};
`;

export const DescriptionBold = styled(Text2)`
  font-family: SFProDisplayMedium;
  color: ${colors.gray800};
`;

export const RightTextBox = styled.View`
  align-self: flex-start;
  margin-left: ${spacers.ss2};
`;

export const RightText = styled(Text2)`
  color: ${colors.gray500};
`;
