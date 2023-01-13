import styled from "styled-components/native";

import { Text1, Text3 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 9px;
  padding: ${spacers.ss6} ${spacers.ss8};
  margin-bottom: ${spacers.ss6};
`;

export const Title = styled(Text3)`
  margin-bottom: ${spacers.ss3};
  font-family: MontserratMedium;
`;

export const Description = styled(Text1)`
  color: ${colors.gray800};
`;
