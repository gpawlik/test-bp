import styled from "styled-components/native";

import { Text2 } from "~/components/text";
import { lineHeights, spacers, colors } from "~/styles/theme";

interface Props {
  hasBorder: boolean;
}

export const Container = styled.View``;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 240,
  },
})`
  padding-top: ${spacers.ss6};
  padding-horizontal: ${spacers.ss5};
`;

export const Title = styled(Text2)`
  font-family: SFProDisplayMedium;
  line-height: ${lineHeights.lh2};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${colors.gray800};
  margin-bottom: ${spacers.ss5};
`;

export const ResouceBox = styled.View`
  margin-bottom: ${spacers.ss5};
`;

export const Section = styled.View`
  margin-bottom: ${spacers.ss5};
`;

export const SessionsBox = styled.View`
  background-color: ${colors.white};
  border-radius: 12px;
`;
