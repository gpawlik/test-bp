import { SessionNotes } from "~/state/session-notes";

export type NotesState = {
  session: SessionNotes[];
  bible: string[];
  personal: string[];
};

export type SessionNotesData = {
  notes: {
    question: string;
    note: string;
  }[];
  planId: string;
  planTitle: string;
  volume: string;
  sessionId: string;
  session: string;
  lastUpdated: number;
};

export type SessionNoteData = {
  title: string;
  notes: SessionNotesData[];
};

export type PlanData = {
  id: string;
  title: string;
};

export enum SortEnum {
  ASC = "ASC",
  DESC = "DESC",
}
