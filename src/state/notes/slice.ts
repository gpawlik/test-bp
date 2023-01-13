import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SessionNotes } from "~/state/session-notes";

import { NotesState } from "./types";

const initialState: NotesState = {
  session: [],
  bible: [],
  personal: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addSessionNotes: (state, action: PayloadAction<SessionNotes[]>) => {
      state.session = action.payload;
    },
  },
});

export const { addSessionNotes } = notesSlice.actions;

export default notesSlice.reducer;
