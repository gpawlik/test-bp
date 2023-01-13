import React from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { OPEN_BOTTOM_SHEET_TIMEOUT } from "../content-container/constants";
import { containerBottomFinalPosition } from "./styles";

interface UseLandingContentStylesParams {
  isBottomSheetOpen: boolean;
}

export const useLandingContentStyles = ({
  isBottomSheetOpen,
}: UseLandingContentStylesParams) => {
  const contentPosition = useSharedValue(0);

  const animatedLogoStyles = useAnimatedStyle(() => {
    const height = interpolate(contentPosition.value, [0, 1], [190, 0]);

    return { height };
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    const bottom = interpolate(
      contentPosition.value,
      [0, 1],
      [0, containerBottomFinalPosition]
    );

    return { bottom };
  });

  const animatedSessionDayStyles = useAnimatedStyle(() => {
    const fontSize = interpolate(contentPosition.value, [0, 1], [48, 28]);

    return { fontSize };
  });

  const animatedSeparatorStyles = useAnimatedStyle(() => {
    const width = interpolate(contentPosition.value, [0, 1], [160, 200]);

    return { width };
  });

  React.useEffect(() => {
    contentPosition.value = withTiming(Number(isBottomSheetOpen), {
      duration: OPEN_BOTTOM_SHEET_TIMEOUT,
    });
  }, [contentPosition, isBottomSheetOpen]);

  return {
    animatedLogoStyles,
    animatedContainerStyles,
    animatedSessionDayStyles,
    animatedSeparatorStyles,
  };
};
