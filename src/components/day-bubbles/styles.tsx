import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { colors, lineHeights, spacers } from "~/styles/theme";
import { Text2, Text2Center, Text6Center } from "../text";
import { createShadow } from "~/utils/shadow";
import { BubbleType, BubbleProps } from "./types";
import { hexToRGB } from "~/utils/colors";
import { isWeb } from "~/utils/platform";
import { CIRCLE_SIZE, CIRCLE_OFFSET, NEUTRAL_CIRCLE_SIZE } from "./constants";

const getContentColor = (bubbleType?: BubbleType) =>
  bubbleType === "completed" || bubbleType === "not-started"
    ? colors.gray700
    : colors.white;

export const BubbleTitle = styled(Text6Center)<BubbleProps>`
  font-family: Montserrat;
  color: ${({ bubbleType }) => getContentColor(bubbleType)};
`;

export const BubbleSeparator = styled.View<BubbleProps>`
  height: 1px;
  background-color: ${({ bubbleType }) => getContentColor(bubbleType)};
  width: 28px;
  margin: ${spacers.ss3};
`;

export const BubbleBody = styled(Text2Center)<BubbleProps>`
  font-family: SFCompact;
  color: ${({ bubbleType }) => getContentColor(bubbleType)};
  margin: 0 ${spacers.ss8};
`;

export const NeutralCircle = styled.View`
  height: ${NEUTRAL_CIRCLE_SIZE}px;
  width: ${NEUTRAL_CIRCLE_SIZE}px;
  border-radius: ${NEUTRAL_CIRCLE_SIZE / 2}px;
  background-color: ${colors.gray600};
  justify-content: center;
  align-items: center;
`;

export const NeutralCircleContainer = styled.View`
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  justify-content: center;
  align-items: center;
`;

export const bubbleShadow = StyleSheet.create({
  shadow: {
    ...createShadow({
      color: hexToRGB(colors.black, 0.3),
      opacity: isWeb ? 0.3 : 0.5,
      radius: isWeb ? 16 : 8,
      offsetWidth: 0,
      offsetHeight: CIRCLE_OFFSET,
      elevation: 12,
    }),
  },
}).shadow;

export const BubbleContent = styled.View`
  height: ${CIRCLE_SIZE - CIRCLE_OFFSET}px;
  width: ${CIRCLE_SIZE - CIRCLE_OFFSET}px;
  top: ${CIRCLE_OFFSET / 2}px;
  left: ${CIRCLE_OFFSET / 2}px;
  z-index: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const OnlyTextWrapper = styled(BubbleContent)`
  width: ${CIRCLE_SIZE / 2}px;
`;

export const OnlyText = styled(Text2)`
  font-family: SFCompact;
  color: ${colors.gray600};
  line-height: ${lineHeights.lh2};
  width: 70px;
`;

export const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    zIndex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const CarouselDotsContainer = styled.View`
  position: absolute;
  bottom: 10px;
  width: 100%;
`;

export const flatListStyles = StyleSheet.create({
  contentContainer: {
    height: CIRCLE_SIZE + 50,
  },
}).contentContainer;
