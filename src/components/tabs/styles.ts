import styled from "styled-components/native";

import { Text3 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.View`
  flex-direction: row;
  padding-bottom: ${spacers.ss4};
`;

export const Label = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: ${spacers.ss4};
  border-bottom-width: 2px;
  border-bottom-color: ${({ isActive }) =>
    isActive ? colors.primaryBlue : colors.transparent};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const LabelText = styled(Text3)``;
