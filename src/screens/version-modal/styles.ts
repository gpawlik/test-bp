import styled from "styled-components/native";

import { Text1, Text2, Text3, Text4 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.ScrollView``;

export const SectionText = styled(Text4)`
  font-family: SFProDisplayBold;
  padding: ${spacers.ss7} ${spacers.ss6};
`;
