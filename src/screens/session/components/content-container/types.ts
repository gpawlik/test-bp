export interface ContentContainerProps {
  children: JSX.Element;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen(isOpen: boolean): void;
}
