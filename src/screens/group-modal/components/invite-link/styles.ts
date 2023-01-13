import styled from "styled-components/native";

import { Text2 } from "~/components/text";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  background-color: ${colors.gray100};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacers.ss6};
  border-radius: ${spacers.ss4};
`;

export const InviteUrl = styled(Text2)<{ selectable: boolean }>`
  color: ${colors.gray800};
  letter-spacing: -0.5px;
`;

export const CopyButton = styled.TouchableOpacity`
  border-bottom-color: ${colors.primaryBlue};
  border-bottom-width: 1px;
`;

export const CopyText = styled(Text2)`
  color: ${colors.primaryBlue};
`;
