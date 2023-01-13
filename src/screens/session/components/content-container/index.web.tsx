import * as React from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { ContentContainerProps } from "./types";
import { WebBottomSheetChevron, WebBottomSheetContainer } from "./styles";
import {
  BOTTOM_SHEET_SNAP_POINTS,
  OPEN_BOTTOM_SHEET_TIMEOUT,
} from "./constants";

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const togglePosition = React.useCallback(() => {
    bottomSheetRef.current?.snapTo(isBottomSheetOpen ? 1 : 2);
    setIsBottomSheetOpen(!isBottomSheetOpen);
  }, [isBottomSheetOpen, setIsBottomSheetOpen]);

  React.useEffect(() => {
    const openBottomSheet = setTimeout(() => {
      togglePosition();
    }, OPEN_BOTTOM_SHEET_TIMEOUT);

    return () => clearTimeout(openBottomSheet);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enabledContentTapInteraction
      borderRadius={10}
      snapPoints={BOTTOM_SHEET_SNAP_POINTS}
      initialSnap={0}
      enabledGestureInteraction={false}
      renderContent={() => (
        <WebBottomSheetContainer>
          <WebBottomSheetChevron
            icon={isBottomSheetOpen ? "chevron-down" : "chevron-up"}
            onPress={togglePosition}
          />

          {children}
        </WebBottomSheetContainer>
      )}
    />
  );
};
