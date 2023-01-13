import styled from "styled-components/native";
import { Text2 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const SessionTitleWrapper = styled.View`
  flex-direction: row;
`;

export const SessionTitle = styled(Text2)`
  color: ${colors.black};
  margin-left: ${spacers.ss3};
`;
