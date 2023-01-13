import { Platform } from "react-native";
import styled from "styled-components/native";
import { colors, spacers } from "~/styles/theme";

const BACK_BUTTON_SIZE = 48;

export const PlanBackButtonContainer = styled.TouchableOpacity`
  height: ${BACK_BUTTON_SIZE}px;
  width: ${BACK_BUTTON_SIZE}px;
  border-radius: ${BACK_BUTTON_SIZE / 2}px;
  background-color: ${colors.white};
  position: absolute;
  margin-top: ${Platform.select({
    ios: spacers.ss11,
    android: spacers.ss10,
    default: spacers.ss8,
  })};
  left: ${spacers.ss5};
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
