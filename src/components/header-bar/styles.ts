import styled from "styled-components/native";
import { colors, spacers } from "~/styles/theme";
import { hexToRGB } from "~/utils/colors";
import { pxToNumber } from "~/utils/theme";
import { IconSizes } from "~/components/icon";

const HEADER_BAR_HEIGHT = "32px";

export const HeaderBarContainer = styled.View`
  flex-direction: row;
  padding: ${spacers.ss5} ${spacers.ss5} ${spacers.ss5} 0;
  height: ${HEADER_BAR_HEIGHT};
  align-content: center;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

export const HeaderBarBackButtonContainer = styled.View`
  margin: 0;
  margin-left: -${spacers.ss2};
`;

export const HeaderIconsContainer = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
`;

export const HeaderIconWrapper = styled.View<{ isFirst?: boolean }>`
  margin-right: ${({ isFirst }) => (isFirst ? spacers.ss8 : spacers.ss7)};
  height: ${IconSizes.Medium}px;
`;

export const HeaderAvatar = styled.Pressable`
  height: ${HEADER_BAR_HEIGHT};
  width: ${HEADER_BAR_HEIGHT};
`;

export const AvatarImage = styled.Image`
  height: ${HEADER_BAR_HEIGHT};
  width: ${HEADER_BAR_HEIGHT};
  border-width: 1px;
  border-radius: ${pxToNumber(HEADER_BAR_HEIGHT) / 2}px;
  border-color: ${hexToRGB(colors.black, 0.3)};
`;

const ABSOLUTE_FILL_DIFFERENT = 6;

export const HeaderAvatarPlaceholderBackground = styled.View`
  background-color: ${colors.white};
  border-radius: ${IconSizes.Large / 2}px;
  position: absolute;
  left: ${ABSOLUTE_FILL_DIFFERENT / 2}px;
  top: ${ABSOLUTE_FILL_DIFFERENT / 2}px;
  height: ${IconSizes.Large - ABSOLUTE_FILL_DIFFERENT}px;
  width: ${IconSizes.Large - ABSOLUTE_FILL_DIFFERENT}px;
  z-index: -1;
`;
