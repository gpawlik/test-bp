export type BubbleType =
  | "only-text"
  | "completed"
  | "in-progress"
  | "not-started"
  | "neutral";

export interface BubbleItem {
  id: number;
  title?: string;
  body?: string;
  type: BubbleType;
}

export interface BubbleProps {
  bubbleType?: BubbleType;
  children?: React.ReactNode;
}
