export type Verse = {
  verseId: string;
  content: string;
};

export type Note = {
  verseId: string;
  content: string;
};

export type ChapterNav = {
  number: number;
  bookId: string;
};

export type Chapter = {
  verseCount: number;
  verses: Verse[];
  notes: Note[];
  reference: string;
  title: string;
  position: number;
  prev: ChapterNav;
  next: ChapterNav;
};

export type Book = {
  bookId: string;
  abbreviation: string;
  name: string;
  chapterCount: number;
  position: number;
};

export type BookMeta = {
  bookId: string;
  chapters: Chapter[];
};

export type Bible = {
  abbreviation: string;
  abbreviationLocal: string;
  bibleId: string;
  name: string;
  updatedAt: string;
};

export type BibleState = {
  currentBible: string;
  currentBook: string;
  currentChapter: number;
  currentBookChapters: {
    [bookId: string]: Chapter[];
  };
  data: Bible[];
  books: Book[];
};

export type BiblePayload = {
  bibleId: string;
  onSuccess: () => void;
  onError: () => void;
};

export type BibleAction = {
  type: string;
  payload: BiblePayload;
  meta: any;
  error: any;
};

export type GetChaptersPayload = {
  bookId: string;
  ignoreSaved?: boolean;
  onError: () => void;
};

export type GetChaptersAction = {
  type: string;
  payload: GetChaptersPayload;
  meta: any;
  error: any;
};

export type ChaptersPayload = {
  bookId: string;
  chapters: Chapter[];
};

export type CurrentChapterPayload = {
  bookId: string;
  chapterId: number;
};
