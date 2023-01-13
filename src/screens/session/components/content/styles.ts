import { Platform } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import styled from "styled-components/native";
import { css } from "styled-components/native";
import { isPad, isWeb, windowHeight } from "~/utils/platform";

export const GestureRecognizerContainer = styled(GestureRecognizer).attrs({
  config: {
    directionalOffsetThreshold: 150,
  },
})`
  ${isWeb
    ? css`
        height: ${windowHeight * 1.1};
      `
    : css`
        flex: 1;
      `}
`;

export const Container = styled.ScrollView`
  ${!isWeb &&
  css`
    flex: 1;
  `}
`;

export const ScrollViewFakePadding = styled.View`
  height: ${Platform.select({
    ios: isPad ? 150 : 100,
    web: 400,
    android: 40,
  })}px;
`;
