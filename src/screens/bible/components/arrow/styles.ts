import styled from "styled-components/native";

import { hexToRGB } from "~/utils/colors";
import { isWeb } from "~/utils/platform";
import { createShadow } from "~/utils/shadow";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.TouchableOpacity<{ isLeft: boolean }>`
  background-color: ${colors.white};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ isLeft }) => (isLeft ? "left" : "right")}: ${spacers.ss5};
`;

export const shadowStyle = {
  ...createShadow({
    color: hexToRGB(colors.black, 0.3),
    opacity: isWeb ? 0.3 : 0.6,
    radius: isWeb ? 16 : 8,
    offsetWidth: 0,
    offsetHeight: 0,
    elevation: 8,
  }),
};
