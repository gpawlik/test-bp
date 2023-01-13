import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Bible, Book, Chapter } from "./types";

const getState = (state: RootState) => state.bible;

export const getCurrentBible: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.currentBible
);

export const getBibles: (state: RootState) => Bible[] = createSelector(
  getState,
  (state) => state?.data || []
);

export const getBibleData: (state: RootState) => Bible | undefined =
  createSelector([getState, getCurrentBible], (state, currentBible) =>
    state?.data.find((item: Bible) => item.abbreviation === currentBible)
  );

export const getBibleAbbreviation: (state: RootState) => string =
  createSelector(
    [getBibleData],
    (bibleData) => bibleData?.abbreviationLocal || bibleData?.abbreviation || ""
  );

export const getCurrentBook: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.currentBook || "GEN"
);

export const getCurrentChapter: (state: RootState) => number = createSelector(
  getState,
  (state) => state?.currentChapter || 1
);

export const getBooks: (state: RootState) => Book[] = createSelector(
  getState,
  (state) => state?.books || []
);

export const getOrderedBooks: (state: RootState) => Book[] = createSelector(
  getBooks,
  (books) => [...books].sort((a, b) => a.position - b.position)
);

export const getCurrentBookName: (state: RootState) => string = createSelector(
  [getState, getCurrentBook],
  (state, bookId) => {
    return (
      state?.books.find((book: Book) => book.bookId === bookId)?.name || ""
    );
  }
);

export const getBookIdByName: (state: RootState, bookName: string) => string =
  createSelector([getState, (_, props) => props], (state, bookName) => {
    return (
      state?.books.find((book: Book) => book.name === bookName)?.bookId || ""
    );
  });

export const getChaptersByBookId: (
  state: RootState,
  bookId: string
) => Chapter[] = createSelector(
  [getState, (_, props) => props],
  (state, bookId) => {
    return state?.currentBookChapters[bookId] || [];
  }
);

export const getCurrentChapters: (state: RootState) => Chapter[] =
  createSelector([getState, getCurrentBook], (state, bookId) => {
    return state?.currentBookChapters[bookId] || [];
  });

export const getCurrentChaptersOrdered: (state: RootState) => Chapter[] =
  createSelector(getCurrentChapters, (chapters) => {
    return [...chapters]
      .filter((chapter) => chapter.verseCount)
      .sort((a, b) => a.position - b.position);
  });
