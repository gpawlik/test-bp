import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { spacers } from "~/styles/theme";

export const Container = styled.TouchableOpacity`
  position: absolute;
  bottom: 110px;
  right: ${spacers.ss6};
`;

export const Content = styled(LinearGradient).attrs({
  colors: ["#5540F4", "#A480FE"],
  start: { x: 0.5, y: 0.5 },
})`
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;
