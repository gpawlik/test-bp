import * as React from "react";
import { Easing } from "react-native-reanimated";
import BottomSheet, { useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { ContentContainerProps } from "./types";
import {
  BOTTOM_SHEET_SNAP_POINTS,
  OPEN_BOTTOM_SHEET_TIMEOUT,
} from "./constants";

export const ContentContainer: React.FC<ContentContainerProps> = React.memo(
  ({ children, setIsBottomSheetOpen, isBottomSheetOpen }) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const animationConfigs = useBottomSheetTimingConfigs({
      duration: OPEN_BOTTOM_SHEET_TIMEOUT * 0.9,
      easing: Easing.inOut(Easing.quad),
    });

    const onChange = React.useCallback(
      (index: number) => {
        if (index === 1) {
          setIsBottomSheetOpen(false);

          return;
        }

        if (index === 2) {
          !isBottomSheetOpen && setIsBottomSheetOpen(true);

          return;
        }
      },
      [isBottomSheetOpen, setIsBottomSheetOpen]
    );

    React.useLayoutEffect(() => {
      if (isBottomSheetOpen) return;

      const openBottomSheet = setTimeout(() => {
        setIsBottomSheetOpen(true);

        bottomSheetRef.current?.snapToIndex(2);
      }, OPEN_BOTTOM_SHEET_TIMEOUT);

      return () => clearTimeout(openBottomSheet);
    }, []);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={isBottomSheetOpen ? 2 : 0}
        snapPoints={BOTTOM_SHEET_SNAP_POINTS}
        onChange={onChange}
        animationConfigs={animationConfigs}
      >
        {children}
      </BottomSheet>
    );
  }
);
