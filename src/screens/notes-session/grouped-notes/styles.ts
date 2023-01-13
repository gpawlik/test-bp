import styled from "styled-components/native";

import { Text3 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Section = styled.View`
  background-color: ${colors.white};
  margin-bottom: ${spacers.ss6};
  border-radius: 8px;
`;

export const SectionTitleBox = styled.View`
  padding: ${spacers.ss6} ${spacers.ss6};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray200};
`;

export const SectionTitle = styled(Text3)`
  color: ${colors.gray800};
  font-family: SFProDisplayMedium;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const EmptyText = styled(Text3)`
  color: ${colors.gray800};
  text-align: center;
  padding: ${spacers.ss6};
`;
