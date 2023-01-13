import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  BibleState,
  Bible,
  Book,
  BiblePayload,
  ChaptersPayload,
  CurrentChapterPayload,
} from "./types";

const initialState: BibleState = {
  currentBible: "NASB",
  data: [],
  books: [],
  currentBook: "GEN",
  currentChapter: 1,
  currentBookChapters: {},
};

export const bibleSlice = createSlice({
  name: "bible",
  initialState,
  reducers: {
    setCurrentBible: (state, action: PayloadAction<BiblePayload>) => {
      state.currentBible = action.payload.bibleId;
    },
    setBibleData: (state, action: PayloadAction<Bible[]>) => {
      state.data = action.payload;
    },
    setBooksData: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload || [];
    },
    setChaptersData: (state, action: PayloadAction<ChaptersPayload>) => {
      const { bookId, chapters } = action.payload || {};
      // Keep only the current book chapters, to prevent state from growing too much
      // Chapters data for each book have an average size of 100kb
      state.currentBookChapters = {
        [bookId]: chapters,
      };
    },
    resetChaptersData: (state) => {
      state.currentBookChapters = initialState.currentBookChapters;
      state.currentBook = initialState.currentBook;
      state.currentChapter = initialState.currentChapter;
    },
    setCurrentChapter: (
      state,
      action: PayloadAction<CurrentChapterPayload>
    ) => {
      const { bookId, chapterId } = action.payload || {};
      state.currentBook = bookId;
      state.currentChapter = chapterId;
    },
  },
});

export const {
  setCurrentBible,
  setBibleData,
  setBooksData,
  setChaptersData,
  resetChaptersData,
  setCurrentChapter,
} = bibleSlice.actions;

export default bibleSlice.reducer;
