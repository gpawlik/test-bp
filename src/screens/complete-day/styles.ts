import styled from "styled-components/native";
import { Text10Center } from "~/components/text";
import { spacers, colors, fontSizes } from "~/styles/theme";

export const CompleteDayContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CHECK_ICON_SIZE = 75;

export const CheckIconContainer = styled.View`
  background-color: ${colors.white};
  height: ${CHECK_ICON_SIZE}px;
  width: ${CHECK_ICON_SIZE}px;
  align-items: center;
  justify-content: center;
  border-radius: ${CHECK_ICON_SIZE / 2}px;
`;

export const DayCompleteHeading = styled(Text10Center)`
  font-family: MontserratLight;
  font-size: ${fontSizes.fs11};
  color: ${colors.white};
  margin: ${spacers.ss9};
  z-index: 1;
`;
