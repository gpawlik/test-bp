import styled from "styled-components/native";

import { Text3 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Section = styled.View`
  background-color: ${colors.white};
  border-radius: 8px;
`;

export const EmptyText = styled(Text3)`
  color: ${colors.gray800};
  text-align: center;
  padding: ${spacers.ss6};
`;
