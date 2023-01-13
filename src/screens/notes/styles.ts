import styled from "styled-components/native";

import { Text8 } from "~/components/text";
import { spacers } from "~/styles/theme";

export const Screen = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  padding-horizontal: ${spacers.ss6};
  padding-top: ${spacers.ss6};
`;

export const Title = styled(Text8)`
  margin-bottom: ${spacers.ss8};
`;

export const Section = styled.View``;
