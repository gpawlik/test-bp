import styled from "styled-components/native";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, spacers } from "~/styles/theme";
import { Text2 } from "~/components/text";
import { isWeb } from "~/utils/platform";

// Using a ScrollView as a wrapper on web to fix the scrolling issue
// keeping mobile fling gestures working as expected
export const Container = styled(isWeb ? Animated.ScrollView : Animated.View)``;

export const Content = styled.ScrollView`
  background-color: ${colors.white};
  margin-bottom: 120px;
`;

export const Shadow = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${spacers.ss6};
  opacity: 0.3;
`;

export const CenteredBox = styled.View`
  ${StyleSheet.absoluteFill};
  align-items: center;
  justify-content: center;
`;

export const ErrorBox = styled.View``;

export const ErrorText = styled(Text2)``;
