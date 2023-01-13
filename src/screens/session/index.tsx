import * as React from "react";
import { HeaderBar } from "~/components/header-bar";
import { useGetSessionQuery } from "~/state/flamelink";
import { Loader } from "~/components/loader";
import { GenericError } from "~/components/generic-error";
import { useAppSelector } from "~/state/hooks";
import { getPlanThumbnail } from "~/state/flamelink/selectors";
import { ContentContainer } from "./components/content-container";
import { Content } from "./components/content";
import { LandingContent } from "./components/landing-content";
import { BackgroundGradient } from "~/components/background-gradient";
import type { SessionProps } from "./types";
import { OPEN_BOTTOM_SHEET_TIMEOUT } from "./components/content-container/constants";

export const Session: React.FC<SessionProps> = ({ route }) => {
  const { sessionId, planId, dayIndex } = route.params;
  const { data, isLoading, error } = useGetSessionQuery(sessionId);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [currentDay, setCurrentDay] = React.useState(dayIndex);

  const planThumbnail = useAppSelector((state) =>
    getPlanThumbnail(state, planId)
  );

  React.useEffect(() => {
    if (isBottomSheetOpen) return;

    const openBottomSheet = setTimeout(() => {
      setIsBottomSheetOpen(true);
    }, OPEN_BOTTOM_SHEET_TIMEOUT);

    return () => clearTimeout(openBottomSheet);
  }, [dayIndex]);

  React.useEffect(() => {
    setCurrentDay(dayIndex);
  }, [dayIndex]);

  if (isLoading || !data) return <Loader fullScreen />;

  if (error) return <GenericError />;

  return (
    <>
      <HeaderBar withLightButtons />

      {planThumbnail && <BackgroundGradient source={{ uri: planThumbnail }} />}

      <LandingContent
        isBottomSheetOpen={isBottomSheetOpen}
        currentDay={currentDay}
      />

      <ContentContainer
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      >
        <Content currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </ContentContainer>
    </>
  );
};
