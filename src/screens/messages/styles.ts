import styled from "styled-components/native";

import { Text8 } from "~/components/text";
import { lineHeights, spacers, colors } from "~/styles/theme";

interface Props {
  hasBorder: boolean;
}

export const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

export const HeaderContainer = styled.View<Props>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${spacers.ss6};
  padding-left: ${spacers.ss6};
  border-bottom-width: 1px;
  border-bottom-color: ${({ hasBorder }) =>
    hasBorder ? colors.gray300 : colors.transparent};
`;

export const HeaderTitle = styled(Text8)`
  font-family: Montserrat;
  line-height: ${lineHeights.lh6};
`;
