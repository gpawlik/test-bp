import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";

import { Text2, Text3 } from "~/components/text";
import { isAndroid, isWeb } from "~/utils/platform";
import { colors, spacers } from "~/styles/theme";

interface ListItemProps {
  isActive: boolean;
}

interface ListIconProps {
  isExpanded: boolean;
}

export const Container = styled.ScrollView``;

export const BookIem = styled(LinearGradient).attrs(
  ({ isActive }: ListItemProps) => ({
    colors: isActive
      ? isWeb || isAndroid
        ? ["#FFE792", "#FEFFD7"]
        : ["#FEFFD7", "#FFE792"]
      : [colors.white, colors.white],
    start: isAndroid ? { x: 0.7, y: 0.7 } : { x: 0.1, y: 0.7 },
  })
)<ListItemProps>`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: ${spacers.ss8};
  padding-right: ${spacers.ss3};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray200};
`;

export const BookText = styled(Text2)``;

export const BookItemIcon = styled(IconButton).attrs(
  ({ isExpanded }: ListIconProps) => ({
    icon: isExpanded ? "menu-up" : "menu-down",
  })
)<ListIconProps>``;

export const ChaptersBox = styled.View`
  background-color: ${colors.amber50};
  padding: ${spacers.ss4};
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ChapterItem = styled.TouchableOpacity<ListItemProps>`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background-color: ${({ isActive }) =>
    isActive ? colors.amber300 : colors.white};

  border-color: ${colors.amber300};
  margin: ${spacers.ss3};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

export const ChapterText = styled(Text3)<ListItemProps>`
  font-family: Montserrat;
  color: ${({ isActive }) => (isActive ? colors.white : colors.black)};
`;
