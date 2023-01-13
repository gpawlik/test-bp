import * as React from "react";

import { Day } from "~/state/flamelink";
import { useAppSelector } from "~/state/hooks";
import {
  getDevotionsBySessionId,
  getSessionById,
} from "~/state/flamelink/selectors";
import {
  ProgressHierarchyIds,
  ProgressState,
  SessionProgress,
  useAddSessionProgressMutation,
  useUpdateSessionProgressMutation,
} from "~/state/content-progress";
import { colors } from "~/styles/theme";
import { AccordionListItem, AccordionListItemIcon } from "../../styles";
import { ProgressIcon } from "../progress-icon";

interface SessionDaysProps extends ProgressHierarchyIds {
  onPressDay(dayIndex: number): void;
  sessionProgressData?: SessionProgress;
}

export const SessionDays: React.FC<SessionDaysProps> = React.memo((props) => {
  const sessionData = useAppSelector((state) =>
    getSessionById(state, props.sessionId)
  );
  const days = useAppSelector((state) =>
    getDevotionsBySessionId(state, props.sessionId)
  );

  const day0 = {
    id: sessionData?.volumeHeading,
    title: sessionData?.volumeHeading,
  };

  return (
    <>
      {sessionData?.volumeHeading ? (
        <SessionDay
          day={day0}
          dayIndex={0}
          daysLength={days.length}
          key="day0"
          {...props}
        />
      ) : null}

      {days.map((day, dayIndex) => {
        // as we are allocating already day0 separately, we need to add 1 to the index to open and track the correct day
        const dayKey = dayIndex + 1;

        return (
          <SessionDay
            day={day}
            dayIndex={dayKey}
            daysLength={days.length}
            key={`day${dayKey}`}
            {...props}
          />
        );
      })}
    </>
  );
});

interface SessionDay
  extends Pick<
    SessionDaysProps,
    "planId" | "volumeId" | "sessionId" | "sessionProgressData" | "onPressDay"
  > {
  dayIndex: number;
  day: Partial<Day>;
  daysLength: number;
}

const SessionDay: React.FC<SessionDay> = React.memo(
  ({
    dayIndex,
    planId,
    volumeId,
    sessionId,
    sessionProgressData,
    onPressDay,
    day,
    daysLength,
  }) => {
    const [updateSessionProgress] = useUpdateSessionProgressMutation();
    const [addSessionProgress] = useAddSessionProgressMutation();

    const dayKey = `day${dayIndex}` as string;
    const { days: daysProgress, sessionId: progressSessionId } =
      sessionProgressData ?? {};

    const dayProgress = daysProgress
      ? daysProgress.find((progress) => progress.key === dayKey)?.state
      : ProgressState.NotStarted;

    const onPress = () => {
      // we create a new record if there is none associated to the selected session
      if (!progressSessionId) {
        addSessionProgress({
          planId,
          volumeId,
          sessionId,
          dayKey,
          totalDays: daysLength,
        });
      } else {
        updateSessionProgress({ sessionId, dayKey });
      }

      onPressDay(dayIndex);
    };

    return (
      <AccordionListItem
        title={day.title}
        onPress={onPress}
        left={() => <ProgressIcon state={dayProgress} isSession={false} />}
        right={() => <AccordionListItemIcon color={colors.black} />}
        isLast={dayIndex === daysLength - 1}
      />
    );
  }
);
