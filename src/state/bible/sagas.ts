import * as FileSystem from "expo-file-system";
import Constants from "expo-constants";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest, select, all } from "redux-saga/effects";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { database } from "<config>/firebase";
import {
  setBibleData,
  setBooksData,
  setChaptersData,
  resetChaptersData,
  setCurrentBible,
} from "~/state/bible/slice";
import {
  BIBLE_DIRECTORY,
  FS_OPTIONS,
  SUPPORTED_BIBLE_VERSIONS,
} from "~/constants";

import { getFullBible, removeBibleData, getChapters } from "./actions";
import {
  getCurrentBible,
  getCurrentBook,
  getChaptersByBookId,
} from "./selectors";
import {
  Bible,
  Book,
  BookMeta,
  Chapter,
  BibleAction,
  GetChaptersAction,
} from "./types";
import { setUserData } from "../user/slice";
import { getUserToken } from "../user/selectors";

const prefix = Constants?.expoConfig?.extra?.firebasePrefix || "stg";
const bibleCollection = `bibles_${prefix}`;
const booksCollection = "books";
const chaptersCollection = "chapters";

function* getFromFileSystem(bibleId: string, fileName: string): SagaIterator {
  try {
    const uri = `${BIBLE_DIRECTORY}/${bibleId}/${fileName}`;
    const file = yield call(FileSystem.getInfoAsync, uri);
    if (file.exists) {
      const result = yield call(FileSystem.readAsStringAsync, uri, FS_OPTIONS);
      return JSON.parse(result).data;
    }
  } catch (e) {
    return null;
  }
}

function* getAndStoreBibleData(
  bibleId: string,
  downloadResults: boolean
): SagaIterator {
  const dataUri = `${BIBLE_DIRECTORY}/${bibleId}/data.json`;

  // Check if we have this data already downloaded
  const downloadedData = yield call(getFromFileSystem, bibleId, "data.json");
  if (downloadedData) {
    return downloadedData;
  }

  // Get the Bible data from Firebase
  const bibleRef = doc(database, bibleCollection, bibleId);
  // @ts-ignore
  const bibleSnapshot = yield call(getDoc, bibleRef);
  if (bibleSnapshot.exists()) {
    const data = bibleSnapshot.data();

    if (data.bibleId) {
      if (downloadResults) {
        // Store Bible data
        yield call(
          FileSystem.writeAsStringAsync,
          dataUri,
          JSON.stringify({ data }),
          FS_OPTIONS
        );
      }

      return data;
    }
  }
}

function* getAndStoreBooks(
  bibleId: string,
  downloadResults: boolean
): SagaIterator {
  const booksUri = `${BIBLE_DIRECTORY}/${bibleId}/books.json`;

  // Check if we have this data already downloaded
  const downloadedBooks = yield call(getFromFileSystem, bibleId, "books.json");
  if (downloadedBooks) {
    return downloadedBooks;
  }

  // Get the books data from Firebase
  const booksRef = collection(
    database,
    bibleCollection,
    bibleId,
    booksCollection
  );
  // @ts-ignore
  const booksSnapshots = yield call(getDocs, booksRef);

  const books: Book[] = [];
  booksSnapshots.forEach((book: QueryDocumentSnapshot<Book>) => {
    if (book.exists()) {
      books.push(book.data());
    }
  });
  if (downloadResults) {
    // Store books of the Bible
    yield call(
      FileSystem.writeAsStringAsync,
      booksUri,
      JSON.stringify({ data: books }),
      FS_OPTIONS
    );
  }

  return books;
}

function* getAndStoreChapters(
  bibleId: string,
  bookId: string,
  downloadResults: boolean
): SagaIterator {
  const bibleDirectory = `${BIBLE_DIRECTORY}/${bibleId}`;
  const bookUri = `${bibleDirectory}/${bookId}.json`;

  // Check if we have this data already downloaded
  const downloadedChapters = yield call(
    getFromFileSystem,
    bookId,
    `${bookId}.json`
  );
  if (downloadedChapters) {
    return {
      chapters: downloadedChapters,
      bookId,
    };
  }

  // Get chapters of the book from Firebase
  const chaptersRef = collection(
    database,
    bibleCollection,
    bibleId,
    booksCollection,
    bookId,
    chaptersCollection
  );
  // @ts-ignore
  const chaptersSnapshots = yield call(getDocs, chaptersRef);
  const chapters: Chapter[] = [];
  chaptersSnapshots.forEach((chapter: QueryDocumentSnapshot<Chapter>) => {
    if (chapter.exists()) {
      chapters.push(chapter.data());
    }
  });

  if (downloadResults) {
    // Store chapters of the book
    yield call(
      FileSystem.writeAsStringAsync,
      bookUri,
      JSON.stringify({ data: chapters }),
      FS_OPTIONS
    );
  }

  return {
    chapters,
    bookId,
  };
}

export function* preloadBibleData(): SagaIterator {
  try {
    const userToken = yield select(getUserToken);
    if (!userToken) {
      return;
    }
    const bibleName = yield select(getCurrentBible);

    // Get the data of all the available Bible versions
    const callEffects = SUPPORTED_BIBLE_VERSIONS.map((abbreviation) => {
      return call(getAndStoreBibleData, abbreviation, false);
    });
    const allBibleData = yield all(callEffects);
    const data = allBibleData.filter((item?: Bible) => !!item);

    if (data.length) {
      yield put(setBibleData(data));
    }

    // Get the books of the current Bible
    const books = yield call(getAndStoreBooks, bibleName, false);
    if (books.length) {
      yield put(setBooksData(books));
      return;
    }
  } catch (e) {
    console.log({ e });
  }
}

export function* bibleSaga() {
  yield takeLatest(setUserData.type, preloadBibleData);
}

export function* handleGetChapters({
  payload: { bookId, ignoreSaved, onError },
}: GetChaptersAction): SagaIterator {
  try {
    const bibleName = yield select(getCurrentBible);
    const currentChapters = yield select(getChaptersByBookId, bookId);
    if (currentChapters.length && !ignoreSaved) {
      return;
    }

    // Get the chapters data
    const data = yield call(getAndStoreChapters, bibleName, bookId, false);
    if (data.chapters.length) {
      yield put(setChaptersData({ bookId, chapters: data.chapters }));
    }
  } catch (e) {
    console.log({ e });
    yield put(resetChaptersData());
    yield call(onError);
  }
}

export function* chaptersSaga() {
  yield takeLatest(getChapters.type, handleGetChapters);
}

export function* handleGetFullBible({
  payload: { bibleId, onSuccess, onError },
}: BibleAction): SagaIterator {
  try {
    const bibleDirectory = `${BIBLE_DIRECTORY}/${bibleId}`;
    const metaUri = `${bibleDirectory}/meta.json`;

    // Create a directory for the corresponding Bible version
    yield call(FileSystem.makeDirectoryAsync, bibleDirectory, {
      intermediates: true,
    });

    // Store Bible data
    yield call(getAndStoreBibleData, bibleId, true);

    // Store books
    const books = yield call(getAndStoreBooks, bibleId, true);

    // Store chapters for each book
    const callEffects = books.map(({ bookId }: Book) => {
      return call(getAndStoreChapters, bibleId, bookId, true);
    });

    const firestoreData = yield all(callEffects);

    // Store the summary of the operation
    yield call(
      FileSystem.writeAsStringAsync,
      metaUri,
      JSON.stringify({
        downloaded: true,
        chapters: firestoreData.map(({ bookId }: BookMeta) => bookId),
      }),
      FS_OPTIONS
    );
    yield call(onSuccess);
  } catch (e) {
    yield call(onError);
  }
}

export function* bibleDownloadSaga() {
  yield takeLatest(getFullBible.type, handleGetFullBible);
}

export function* handleDeleteBible({
  payload: { bibleId, onSuccess, onError },
}: BibleAction): SagaIterator {
  try {
    const bibleDirectory = `${BIBLE_DIRECTORY}/${bibleId}`;
    yield call(FileSystem.deleteAsync, bibleDirectory, { idempotent: true });
    yield call(onSuccess);
  } catch (e) {
    yield call(onError);
  }
}

export function* bibleDeleteSaga() {
  yield takeLatest(removeBibleData.type, handleDeleteBible);
}

export function* handleBibleChange({
  payload: { bibleId, onSuccess, onError },
}: BibleAction): SagaIterator {
  try {
    const currentBook: string = yield select(getCurrentBook);
    // Get the books of the current Bible
    const books = yield call(getAndStoreBooks, bibleId, false);
    if (books.length) {
      yield put(setBooksData(books));
      yield put(getChapters({ bookId: currentBook, ignoreSaved: true }));
      return;
    }
    yield call(onSuccess);
  } catch (e) {
    yield call(onError);
  }
}

export function* bibleChangeSaga() {
  yield takeLatest(setCurrentBible.type, handleBibleChange);
}
