export type DaysProgress = Array<{ key: string; state: ProgressState }> | [];

export enum ProgressState {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
}

export interface ProgressHierarchyIds {
  sessionId: string;
  volumeId: string;
  planId: string;
}

export interface SessionProgress extends ProgressHierarchyIds {
  userId: string;
  state: ProgressState;
  days: DaysProgress;
}

export interface AddSessionProgressParams extends ProgressHierarchyIds {
  totalDays: number;
  dayKey?: string;
}

export interface UpdateSessionProgressParams
  extends Partial<AddSessionProgressParams> {
  shouldMarkDayAsComplete?: boolean;
}

export interface GetProgressByPlanData {
  planProgress: SessionProgress[] | [];
  currentSessionInProgress: SessionProgress;
  numberOfDaysCompleted: number;
  shouldDisplayMainButton: boolean;
}

export interface GetProgressByPlanData {
  planProgress: SessionProgress[] | [];
  currentSessionInProgress: SessionProgress;
  numberOfDaysCompleted: number;
}
