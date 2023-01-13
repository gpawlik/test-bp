import styled from "styled-components/native";
import { Text3 } from "~/components/text";
import { lineHeights, spacers } from "~/styles/theme";

export const VolumeOverviewHeading = styled(Text3)`
  font-family: SFProDisplayBold;
  padding: 0 ${spacers.ss5};
  line-height: ${lineHeights.lh3};
  font-weight: 700;
`;
