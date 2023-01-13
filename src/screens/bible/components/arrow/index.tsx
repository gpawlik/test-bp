import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TAB_BAR_HEIGHT } from "~/components/tab-bar/styles";
import { pxToNumber } from "~/utils/theme";
import { spacers } from "~/styles/theme";
import { Container, shadowStyle } from "./styles";

interface Props {
  onPress: () => void;
  isLeft?: boolean;
}

export const Arrow = React.memo<Props>(({ onPress, isLeft }) => {
  const iconType = isLeft ? "chevron-left" : "chevron-right";
  const { bottom } = useSafeAreaInsets();

  const containerStyle = React.useMemo(
    () => [
      shadowStyle,
      { bottom: bottom + TAB_BAR_HEIGHT + pxToNumber(spacers.ss5) },
    ],
    [bottom]
  );

  return (
    <Container onPress={onPress} isLeft={!!isLeft} style={containerStyle}>
      <Icon name={iconType} size={30} />
    </Container>
  );
});
