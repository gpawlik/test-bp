import styled from "styled-components/native";
import { Platform } from "react-native";

import { Text2, Text5, Text6 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.View``;

export const Title = styled(Text6)`
  font-family: SFProDisplayMedium;
  font-weight: 600;
  padding-top: 30px;
  padding-horizontal: ${spacers.ss7};
`;

export const TextContent = styled.View`
  padding: ${spacers.ss7};
`;

export const Number = styled(Text2)`
  color: ${colors.amber600};
  font-family: ${Platform.OS === "ios" ? "LoraSuperscript" : "Lora"};
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
`;

export const Verse = styled(Text5)<{ isHighlighted?: boolean }>`
  color: ${colors.gray800};
  font-family: Lora;
  letter-spacing: 0.5px;
  line-height: 36px;
  ${({ isHighlighted }) => (isHighlighted ? "text-decoration: underline" : "")};
`;
