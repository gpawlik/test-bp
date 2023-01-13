import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "~/styles/theme";

export const Container = styled.View`
  height: 6px;
  width: 100%;
  border-radius: 3px;
  background-color: ${colors.gray200};
  overflow: hidden;
`;

export const Bar = styled(LinearGradient).attrs({
  colors: ["#5357FA", "#7DC0FE"],
  start: { x: 0, y: 1 },
})<{ width: number }>`
  border-radius: 3px;
  height: 100%;
  width: ${({ width }) => width}%;
`;
