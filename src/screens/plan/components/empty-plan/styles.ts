import styled from "styled-components/native";

import { Text2 } from "~/components/text";
import { spacers, colors, lineHeights } from "~/styles/theme";

export const Container = styled.View`
  padding: 0 ${spacers.ss5};
`;

export const Content = styled.View`
  border-width: 1px;
  border-color: ${colors.gray300};
  background-color: ${colors.gray50};
  border-radius: ${spacers.ss6};
  margin-bottom: ${spacers.ss6};
  padding: ${spacers.ss6} ${spacers.ss5};
  align-items: center;
`;

export const Title = styled(Text2)`
  font-family: MontserratBold;
  margin: ${spacers.ss3} 0;
  color: ${colors.gray600};
  line-height: ${lineHeights.lh2};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Description = styled(Text2)`
  font-family: SFCompact;
  color: ${colors.gray700};
  line-height: ${lineHeights.lh2};
  text-align: center;
`;
