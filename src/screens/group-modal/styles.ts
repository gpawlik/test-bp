import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

export const Content = styled.View`
  margin-horizontal: ${spacers.ss6};
  flex: 1;
`;

export const SectionBox = styled.View`
  margin-bottom: ${spacers.ss6};
`;
