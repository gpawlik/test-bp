import * as React from "react";
import { useRoute } from "@react-navigation/native";
import { useGetSessionQuery } from "~/state/flamelink";
import { getPlanById, getPlanLogo } from "~/state/flamelink/selectors";
import { useAppSelector } from "~/state/hooks";
import type { SessionRouteProp } from "~/screens/session/types";
import { formatMessage } from "~/utils/translation";
import {
  SessionHomeContent,
  SessionDay,
  SessionLogo,
  SessionSeparator,
  SessionTitle,
  SessionVolume,
} from "./styles";
import { messages } from "../../intl";
import { useLandingContentStyles } from "./hooks";

interface LandingContentProps {
  isBottomSheetOpen: boolean;
  currentDay: number;
}

export const LandingContent: React.FC<LandingContentProps> = ({
  isBottomSheetOpen,
  currentDay,
}) => {
  const {
    params: { sessionId, volumeIndex, sessionIndex, planId },
  } = useRoute<SessionRouteProp>();
  const { data } = useGetSessionQuery(sessionId);
  const {
    animatedLogoStyles,
    animatedContainerStyles,
    animatedSessionDayStyles,
    animatedSeparatorStyles,
  } = useLandingContentStyles({ isBottomSheetOpen });

  const planData = useAppSelector((state) => getPlanById(state, planId));
  const planLogo = useAppSelector((state) => getPlanLogo(state, planId));

  const sessionVolumeText = React.useMemo(() => {
    const contentIndexText = formatMessage(messages.contentIndex, {
      volumeIndex: volumeIndex + 1,
      sessionIndex: sessionIndex + 1,
    });

    return `${planData?.title} ${contentIndexText}`;
  }, [planData?.title, sessionIndex, volumeIndex]);

  const sessionDayText = React.useMemo(
    () =>
      currentDay === 0
        ? data?.volumeOverview?.heading ?? ""
        : formatMessage(messages.sessionDay, {
            currentDay,
          }),
    [currentDay, data?.volumeOverview?.heading]
  );

  if (!data) return null;

  return (
    <SessionHomeContent style={animatedContainerStyles}>
      {planLogo && (
        <SessionLogo style={animatedLogoStyles} source={{ uri: planLogo }} />
      )}

      <SessionSeparator style={animatedSeparatorStyles} />

      <SessionVolume>{sessionVolumeText}</SessionVolume>

      <SessionSeparator style={animatedSeparatorStyles} />

      <SessionTitle>{data.title}</SessionTitle>

      <SessionDay style={animatedSessionDayStyles}>{sessionDayText}</SessionDay>
    </SessionHomeContent>
  );
};
