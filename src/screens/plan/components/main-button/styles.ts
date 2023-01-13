import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Text2 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";
import { isWeb } from "~/utils/platform";
import { pxToNumber } from "~/utils/theme";

const BUTTON_CONTAINER_BORDER_RADIUS = "42px";
const BUTTON_CONTAINER_HEIGHT = "44px";

export const StartButton = styled(Button).attrs({
  mode: "contained",
  color: colors.gray700,
  labelStyle: {
    color: colors.gray700,
    marginTop: isWeb ? pxToNumber(spacers.ss3) : undefined,
  },
})`
  border-radius: ${BUTTON_CONTAINER_BORDER_RADIUS};
  margin: ${spacers.ss5};
  height: ${BUTTON_CONTAINER_HEIGHT};
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export const ResumeButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
`;

export const ResumeButtonTextContainer = styled(Button)`
  border-radius: 0;
  margin: ${spacers.ss5} 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: ${BUTTON_CONTAINER_HEIGHT};
  background-color: ${colors.gray700};
  flex-direction: row;
  padding: 0 ${spacers.ss10};
  flex: 1;
`;

const RESUME_ICON_CONTAINER_SIZE = 64;

const ResumeButtonIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.gray700};
  width: ${RESUME_ICON_CONTAINER_SIZE}px;
`;

export const ResumeButtonProgress = styled(ResumeButtonIconContainer)`
  margin: ${spacers.ss5} 0 ${spacers.ss5} ${spacers.ss5};
  border-top-left-radius: ${BUTTON_CONTAINER_BORDER_RADIUS};
  border-bottom-left-radius: ${BUTTON_CONTAINER_BORDER_RADIUS};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const ResumeButtonGroup = styled(ResumeButtonIconContainer)`
  margin: ${spacers.ss5} ${spacers.ss5} ${spacers.ss5} 1px;
  border-top-right-radius: ${BUTTON_CONTAINER_BORDER_RADIUS};
  border-bottom-right-radius: ${BUTTON_CONTAINER_BORDER_RADIUS};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const ButtonText = styled(Text2).attrs({
  color: colors.white,
})`
  letter-spacing: 1px;
`;
