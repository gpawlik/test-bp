import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { List } from "react-native-paper";
import styled, { css } from "styled-components/native";
import { colors, fontSizes, spacers } from "~/styles/theme";
import { isAndroid, isWeb } from "~/utils/platform";
import { pxToNumber } from "~/utils/theme";
import { Text2, Text6 } from "~/components/text";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGB } from "~/utils/colors";

export const Content = styled.View`
  margin-bottom: 60px;
  flex: 1;
`;

export const PlanCoverImage = styled.Image`
  height: 300px;
  width: 100%;
  border-bottom-left-radius: ${spacers.ss9};
  border-bottom-right-radius: ${spacers.ss9};
`;

export const PlanCoverImagePlaceholder = styled(Animated.View)`
  height: 300px;
  width: 100%;
  border-radius: ${spacers.ss5};
  justify-items: center;
  align-items: center;
  justify-content: center;
  background-color: ${hexToRGB(colors.black, 0.5)};
  z-index: 1;
  ${StyleSheet.absoluteFill}
`;

export const PlanTitle = styled(Text6)`
  font-family: Montserrat;
  margin: ${spacers.ss5};
`;

export const PlanProgress = styled(Text2)`
  margin: 0 ${spacers.ss5};
  color: ${colors.gray600};
`;

export const VolumeSection = styled(List.Section).attrs({
  titleStyle: {
    fontSize: pxToNumber(fontSizes.fs1),
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: colors.black,
    marginLeft: -pxToNumber(spacers.ss6),
  },
})`
  margin: ${spacers.ss5};
`;

const LIST_ITEM_HEIGHT = 48;

interface AccordionListProps {
  isExpanded: boolean;
}

export const AccordionList = styled(LinearGradient).attrs(
  ({ isExpanded }: AccordionListProps) => ({
    colors: isExpanded
      ? isWeb || isAndroid
        ? ["#FFE792", "#FEFFD7"]
        : ["#FEFFD7", "#FFE792"]
      : [colors.white, colors.white],
    start: isAndroid ? { x: 0.7, y: 0.7 } : { x: 0.1, y: 0.7 },
  })
)<AccordionListProps>`
  height: ${LIST_ITEM_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: ${spacers.ss5};
`;

interface AccordionListIconProps {
  isExpanded: boolean;
}

export const AccordionListIcon = styled(List.Icon).attrs(
  ({ isExpanded }: AccordionListIconProps) => ({
    icon: isExpanded ? "menu-up" : "menu-down",
  })
)<AccordionListIconProps>`
  margin-right: -${spacers.ss4};
`;

export const AccordionListItem = styled(List.Item).attrs({
  titleStyle: {
    fontSize: pxToNumber(fontSizes.fs2),
    color: colors.black,
    justifyContent: "center",
  },
})<{ isLast: boolean }>`
  background-color: ${colors.amber50};
  height: ${LIST_ITEM_HEIGHT}px;
  justify-content: center;
  border-bottom-color: ${colors.gray100};
  border-bottom-width: 1px;
  padding: 0 ${spacers.ss6};

  ${({ isLast }) =>
    isLast &&
    css`
      border-bottom-left-radius: ${spacers.ss4};
      border-bottom-right-radius: ${spacers.ss4};
      border-bottom-width: 0;
    `}
`;

export const AccordionListItemIcon = styled(List.Icon).attrs({
  icon: "chevron-right",
})`
  margin-right: -${spacers.ss4};
`;

export const VolumesScrollView = styled.ScrollView``;
