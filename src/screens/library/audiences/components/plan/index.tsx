import React from "react";
import { ActivityIndicator } from "react-native-paper";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getPlanThumbnail } from "~/state/flamelink/selectors";
import { useAppSelector } from "~/state/hooks";
import {
  PlanThumbnail,
  PlanShadow,
  shadowStyle,
  PlanLoadingPlaceholder,
} from "./styles";

interface PlanProps {
  onPress(): void;
  planId: string;
}

export const Plan: React.FC<PlanProps> = React.memo(({ planId, onPress }) => {
  const planThumbnail = useAppSelector((state) =>
    getPlanThumbnail(state, planId)
  );

  const opacity = useSharedValue(1);
  const loadingPlaceholderStyles = useAnimatedStyle(
    () => ({ opacity: opacity.value }),
    [opacity]
  );

  const onLoad = React.useCallback(() => {
    opacity.value = withTiming(0, { duration: 1000 });
  }, [opacity]);

  return (
    <PlanShadow style={shadowStyle} onPress={onPress}>
      <PlanLoadingPlaceholder style={loadingPlaceholderStyles}>
        <ActivityIndicator />
      </PlanLoadingPlaceholder>

      {planThumbnail && (
        <PlanThumbnail source={{ uri: planThumbnail }} onLoad={onLoad} />
      )}
    </PlanShadow>
  );
});
