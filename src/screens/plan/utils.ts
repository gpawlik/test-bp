import { SessionProgress, ProgressState } from "~/state/content-progress";
import type { VolumesContent } from "~/state/flamelink/types";

/**
 * Returns the hierarchy index to be used for the table of contents
 */
export function getHierarchyIndexes(
  volumes: VolumesContent[],
  { volumeId, sessionId, days }: SessionProgress
) {
  const volumeIndex = volumes.findIndex((volume) => volume.id === volumeId);
  const { sessions } = volumes[volumeIndex];

  return {
    volumeIndex,
    sessionIndex: sessions.findIndex((id) => id === sessionId) ?? 0,
    dayIndex: days.findIndex(({ state }) => state === ProgressState.InProgress),
  };
}
