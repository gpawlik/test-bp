import { ProgressState, SessionProgress } from "~/state/content-progress";
import { newWeekBubble, startNextSessionBubble } from "./mocks";
import type { BubbleType } from "./types";
import { formatMessage } from "~/utils/translation";
import { messages } from "./intl";

const getItemBodyAndType = (state: ProgressState) => {
  switch (state) {
    case ProgressState.InProgress:
      return {
        body: formatMessage(messages.inProgress),
        type: "in-progress" as BubbleType,
      };
    case ProgressState.Completed:
      return {
        body: formatMessage(messages.completed),
        type: "completed" as BubbleType,
      };
    default:
      return {
        body: formatMessage(messages.notStarted),
        type: "not-started" as BubbleType,
      };
  }
};

export const mapBubblesBySessionId = (progressData?: SessionProgress) => {
  if (!progressData?.days?.length) return [];

  return [
    newWeekBubble,
    ...(progressData?.days.map((day, index) => ({
      id: index,
      title:
        index === 0
          ? formatMessage(messages.groupLabel)
          : formatMessage(messages.dayLabel, { dayNumber: index }),
      body: getItemBodyAndType(day.state).body,
      type: getItemBodyAndType(day.state).type,
    })) ?? []),
    startNextSessionBubble,
  ];
};

// Returns a random number between min (inclusive) and max (exclusive)
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
