import styled from "styled-components/native";
import { lineHeights, spacers } from "~/styles/theme";
import { getElementColorBasedOnDayTime } from "~/utils/theme";
import { Text3, Text9 } from "../text";

const elementsColor = getElementColorBasedOnDayTime();

export const GreetingsContainer = styled.View`
  margin: ${spacers.ss8};
`;

export const GreetingsTitle = styled(Text9)`
  font-family: Montserrat;
  color: ${elementsColor};
`;

export const GreetingsDivider = styled.View`
  height: 3px;
  width: ${spacers.ss8};
  background-color: ${elementsColor};
  margin: ${spacers.ss4} 0;
`;

export const GreetingsPhrase = styled(Text3)`
  line-height: ${lineHeights.lh3};
  color: ${elementsColor};
`;
