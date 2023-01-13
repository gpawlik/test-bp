import {
  AddSessionProgressParams,
  ProgressState,
  SessionProgress,
} from "./types";

/**
 * Counts the days that have been completed
 */
export function getNumberOfDaysCompleted(
  sessionProgressArray: SessionProgress[]
): number {
  return sessionProgressArray.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue.days.filter((day) => day.state === ProgressState.Completed)
        .length,
    0
  );
}

export function getNewSessionProgressToStore({
  userId,
  planId,
  volumeId,
  sessionId,
  totalDays,
  dayKey,
}: AddSessionProgressParams & {
  userId: string;
}): SessionProgress {
  // Maps the initial state of the days to be stored
  const daysProgressMap = Array.from({ length: totalDays + 1 }, (_, index) => {
    const key = `day${index}`;

    // first day is marked as in progress by default if there is not a specific day that was pressed
    const state =
      !dayKey && index === 0
        ? ProgressState.InProgress
        : // if there is a provided dayKey, we mark it as in progrees
        dayKey === key
        ? ProgressState.InProgress
        : ProgressState.NotStarted;

    return {
      key,
      state,
    };
  });

  return {
    userId,
    planId,
    volumeId,
    sessionId,
    // Initializing session as in progress
    state: ProgressState.InProgress,
    days: daysProgressMap,
  };
}

export function getUniquePlansInProgress(
  progress: SessionProgress[]
): SessionProgress[] {
  const uniquePlans = new Set();

  return progress.filter((p) => {
    if (uniquePlans.has(p.planId)) {
      return false;
    }

    uniquePlans.add(p.planId);
    return true;
  });
}
