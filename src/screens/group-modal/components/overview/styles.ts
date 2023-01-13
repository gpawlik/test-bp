import styled from "styled-components/native";

import { Text1, Text2, Text3 } from "~/components/text";

import { spacers, colors } from "~/styles/theme";

export const Header = styled.View`
  margin-bottom: ${spacers.ss6};
  align-items: center;
`;

export const Title = styled(Text3)`
  margin-bottom: ${spacers.ss3};
  font-family: SFProDisplayMedium;
`;

export const EditButton = styled.TouchableOpacity``;

export const EditText = styled(Text1)`
  color: ${colors.warmGray500};
`;

export const SectionTitle = styled(Text2)`
  margin-bottom: ${spacers.ss3};
  font-family: SFProDisplayMedium;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${colors.gray800};
  margin-bottom: ${spacers.ss4};
`;
