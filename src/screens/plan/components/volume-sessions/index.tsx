import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useAppSelector } from "~/state/hooks";
import { getSessionById } from "~/state/flamelink/selectors";
import {
  ProgressHierarchyIds,
  SessionProgress,
} from "~/state/content-progress";
import { AccordionList, AccordionListIcon } from "../../styles";
import { SessionTitle, SessionTitleWrapper } from "./styles";
import { ProgressIcon } from "../progress-icon";
import { OnPressSessionParams } from "../..";
import { SessionDays } from "../session-days";

interface VolumeSessionsProps
  extends Pick<ProgressHierarchyIds, "planId" | "volumeId"> {
  sessions: string[];
  volumeIndex: number;
  progressData: [] | SessionProgress[];
  onPressSession: (params: OnPressSessionParams) => void;
}

export const VolumeSessions: React.FC<VolumeSessionsProps> = React.memo(
  ({ sessions, volumeIndex, ...rest }) => {
    if (!sessions.length) return null;

    return (
      <>
        {sessions.map((sessionId, sessionIndex) => (
          <VolumeSession
            sessionId={sessionId}
            sessionIndex={sessionIndex}
            volumeIndex={volumeIndex}
            key={`session-${volumeIndex}-${sessionIndex}`}
            {...rest}
          />
        ))}
      </>
    );
  }
);

interface VolumeSessionProps
  extends Pick<
    VolumeSessionsProps,
    "planId" | "volumeId" | "progressData" | "onPressSession"
  > {
  volumeIndex: number;
  sessionIndex: number;
  sessionId: string;
}

const VolumeSession: React.FC<VolumeSessionProps> = React.memo(
  ({
    volumeIndex,
    sessionIndex,
    progressData,
    onPressSession,
    sessionId,
    ...rest
  }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const sessionData = useAppSelector((state) =>
      getSessionById(state, sessionId)
    );

    const sessionProgressData = progressData.find(
      (data) => sessionId === data.sessionId
    );

    const onExpandSession = () => setIsExpanded((expanded) => !expanded);

    const onPressDay = (dayIndex: number) =>
      onPressSession({
        sessionId,
        volumeIndex,
        sessionIndex,
        dayIndex,
      });

    return (
      <>
        <TouchableOpacity onPress={onExpandSession}>
          <AccordionList isExpanded={isExpanded}>
            <SessionTitleWrapper>
              <ProgressIcon
                state={sessionProgressData?.state}
                isSession={true}
              />

              <SessionTitle>{sessionData?.title || ""}</SessionTitle>
            </SessionTitleWrapper>

            <AccordionListIcon isExpanded={isExpanded} />
          </AccordionList>
        </TouchableOpacity>

        {isExpanded && (
          <SessionDays
            sessionId={sessionId}
            sessionProgressData={sessionProgressData}
            onPressDay={onPressDay}
            {...rest}
          />
        )}
      </>
    );
  }
);
