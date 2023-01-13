import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { colors, spacers } from "~/styles/theme";
import { hexToRGB } from "~/utils/colors";
import { isWeb } from "~/utils/platform";
import { createShadow } from "~/utils/shadow";
import { pxToNumber } from "~/utils/theme";
import { planSize } from "../../styles";

export const PlansContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
  padding: ${spacers.ss6} ${spacers.ss6} ${pxToNumber(planSize) / 8}px
    ${spacers.ss6};
`;

export const PlanThumbnail = styled.Image`
  width: ${planSize};
  height: ${planSize};
  border-radius: ${spacers.ss5};
  margin: 0 ${spacers.ss6} 0 0;
`;

export const PlanShadow = styled.TouchableOpacity`
  border-radius: ${spacers.ss5};
  width: ${planSize};
  margin: 0 ${spacers.ss6} ${spacers.ss6} 0;
`;

export const shadowStyle = {
  ...createShadow({
    color: hexToRGB(colors.black, 0.3),
    opacity: isWeb ? 0.3 : 0.6,
    radius: isWeb ? 16 : 8,
    offsetWidth: 0,
    offsetHeight: 15,
    elevation: 12,
  }),
};

export const PlanLoadingPlaceholder = styled(Animated.View)`
  width: ${planSize};
  height: ${planSize};
  border-radius: ${spacers.ss5};
  justify-items: center;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: ${hexToRGB(colors.black, 0.1)};
  ${StyleSheet.absoluteFill}
`;
