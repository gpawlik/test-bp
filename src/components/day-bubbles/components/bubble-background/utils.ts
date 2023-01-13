import CloudsActive from "<assets>/lottie/clouds-active.json";
import CloudsInactive from "<assets>/lottie/clouds-inactive.json";
import CloudsCompleted from "<assets>/lottie/clouds-completed.json";
import { BubbleType } from "../../types";

export function getBubbleByType(bubbleType?: BubbleType) {
  if (bubbleType === "completed") return CloudsCompleted;

  if (bubbleType === "in-progress") return CloudsActive;

  return CloudsInactive;
}
