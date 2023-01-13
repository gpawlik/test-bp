import styled from "styled-components/native";
import { spacers } from "~/styles/theme";
import { Icon } from "../icon";

export const CarouselContainer = styled.View`
  height: 50px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const CarouselDot = styled(Icon)`
  margin: ${spacers.ss5};
`;
