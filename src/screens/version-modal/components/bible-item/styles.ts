import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text1, Text2, Text3, Text4 } from "~/components/text";
import { isAndroid, isWeb } from "~/utils/platform";
import { colors, spacers } from "~/styles/theme";

interface ItemProps {
  isActive: boolean;
}

interface IconProps {
  isDownloaded: boolean;
}

export const Item = styled(LinearGradient).attrs(({ isActive }: ItemProps) => ({
  colors: isActive
    ? isWeb || isAndroid
      ? ["#FFE792", "#FEFFD7"]
      : ["#FEFFD7", "#FFE792"]
    : [colors.white, colors.white],
  start: isAndroid ? { x: 0.7, y: 0.7 } : { x: 0.1, y: 0.7 },
}))<ItemProps>`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-vertical: ${spacers.ss5};
  padding-horizontal: ${spacers.ss6};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray200};
`;

export const IconBox = styled.View<ItemProps>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ isActive }) =>
    isActive ? colors.emerald600 : colors.transparent};
  align-items: center;
  justify-content: center;
  margin-right: ${spacers.ss6};
`;

export const CheckIcon = styled(MaterialCommunityIcons).attrs({
  name: "check",
  color: colors.white,
  size: 12,
})``;

export const TextBox = styled.TouchableOpacity`
  flex: 1;
`;

export const Title = styled(Text2)`
  font-family: SFProDisplayMedium;
  margin-bottom: ${spacers.ss2};
  color: ${colors.gray800};
`;

export const Description = styled(Text1)`
  color: ${colors.gray500};
`;

export const DownloadButton = styled.TouchableOpacity``;

export const DownloadIcon = styled(MaterialCommunityIcons).attrs(
  ({ isDownloaded }: IconProps) => ({
    name: isDownloaded ? "check-underline" : "download",
    size: 20,
    color: colors.gray700,
  })
)``;
