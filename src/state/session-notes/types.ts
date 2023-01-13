export interface SessionNote {
  key: string;
  note: string;
}

export interface SessionNotes {
  userId: string;
  sessionId: string;
  lastUpdated: number;
  notes: SessionNote[];
}

export interface GetAllSessionNotesData {
  notes: SessionNotes[];
}

export interface GetSessionNotesData {
  notes: SessionNote[];
}

export interface AddSessionNotesParams {
  sessionId: string;
  note: SessionNote;
}
