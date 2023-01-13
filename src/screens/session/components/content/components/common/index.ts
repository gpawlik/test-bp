import styled from "styled-components/native";
import { Text6, Text7 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";

export const SectionTitle = styled(Text7)`
  font-family: Montserrat;
  padding: ${spacers.ss5};
  color: ${colors.black};
  letter-spacing: -${pxToNumber(spacers.ss1) / 3}px;
  text-transform: capitalize;
`;

export const SubsectionTitle = styled(Text6)`
  font-family: Montserrat;
  padding: ${spacers.ss5};
  color: ${colors.black};
  letter-spacing: -${pxToNumber(spacers.ss1) / 3}px;
`;
