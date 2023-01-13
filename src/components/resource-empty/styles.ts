import styled from "styled-components/native";

import { Text2 } from "~/components/text";
import { spacers, colors, lineHeights } from "~/styles/theme";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${spacers.ss4};
  border-width: 1px;
  border-color: ${colors.gray300};
  border-radius: 16px;
  background-color: ${colors.gray50};
`;

export const Content = styled.View`
  flex-shrink: 1;
  margin-right: ${spacers.ss4};
`;

export const EmptyImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: ${spacers.ss6};
`;

export const Title = styled(Text2)`
  font-family: MontserratBold;
  font-size: 13px;
  margin-bottom: ${spacers.ss3};
  color: ${colors.gray600};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Description = styled(Text2)`
  font-family: SFCompact;
  color: ${colors.gray700};
  line-height: ${lineHeights.lh2};
`;
