import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";
import { Text2, Text3 } from "~/components/text";

export const Container = styled.View<{ hasSeparator?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ hasSeparator }) =>
    hasSeparator ? colors.gray300 : colors.transparent};
`;

export const ButtonBox = styled.TouchableOpacity`
  padding: ${spacers.ss7};
`;

export const TitleBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${spacers.ss7};
`;

export const ButtonText = styled(Text3)<{ isHighlighted?: boolean }>`
  font-family: SFProDisplayMedium;
  color: ${({ isHighlighted }) =>
    isHighlighted ? colors.indigo600 : colors.gray500};
`;

export const Title = styled(Text2)`
  font-family: SFProDisplayMedium;
`;
