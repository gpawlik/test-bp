import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.TouchableOpacity`
  width: 88px;
  align-self: center;
  margin-bottom: ${spacers.ss6};
`;

export const CameraBox = styled.View`
  background-color: ${colors.gray200};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-color: ${colors.white};
  border-width: 2px;
`;
