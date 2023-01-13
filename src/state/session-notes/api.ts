import Constants from "expo-constants";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { database } from "<config>/firebase";
import { addSessionNotes } from "~/state/notes";

import type {
  AddSessionNotesParams,
  GetAllSessionNotesData,
  GetSessionNotesData,
  SessionNote,
  SessionNotes,
} from "./types";
import type { RootState } from "../store";

const suffix = Constants?.expoConfig?.extra?.firebasePrefix || "stg";
const sessionNotesCollection = `session_notes_${suffix}`;
const SESSION_NOTES_TAG = "SessionNotes";

export const sessionNotesApi = createApi({
  reducerPath: "sessionNotesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [SESSION_NOTES_TAG],
  endpoints: (builder) => ({
    addSessionNotes: builder.mutation<string, AddSessionNotesParams>({
      async queryFn({ sessionId, note }, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionNotesCollection),
            where("userId", "==", userId),
            where("sessionId", "==", sessionId)
          );
          const querySnapshot = await getDocs(q);
          const { notes } = (querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          )[0] as GetSessionNotesData) ?? { notes: [] };

          if (notes && notes.length > 0) {
            const shouldUpdateNote = notes.find((n) => n.key === note.key);

            const notesToSave = shouldUpdateNote
              ? // overwrites the current existing note
                notes.map((n) => {
                  if (n.key === note.key) {
                    return { key: n.key, note: note.note };
                  }

                  return n;
                })
              : [...notes, note];

            await setDoc(
              doc(database, sessionNotesCollection, querySnapshot.docs[0].id),
              { lastUpdated: Date.now(), notes: notesToSave },
              { merge: true }
            );

            return { data: "Session notes updated successfully" };
          }

          const sessionNoteToStore: SessionNotes = {
            userId,
            sessionId,
            lastUpdated: Date.now(),
            notes: [note],
          };

          await addDoc(
            collection(database, sessionNotesCollection),
            sessionNoteToStore
          );

          return { data: "Session notes created successfully" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [SESSION_NOTES_TAG],
    }),

    getSessionNotes: builder.query<GetSessionNotesData, string>({
      async queryFn(sessionId, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionNotesCollection),
            where("userId", "==", userId),
            where("sessionId", "==", sessionId)
          );

          const querySnapshot = await getDocs(q);
          const { notes } = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          )[0] as GetSessionNotesData;

          return { data: { notes } };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_NOTES_TAG],
    }),

    getAllSessionNotes: builder.query<GetAllSessionNotesData, null>({
      async queryFn(_, { getState, dispatch }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionNotesCollection),
            where("userId", "==", userId)
          );

          const querySnapshot = await getDocs(q);
          const notes = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          ) as SessionNotes[];

          dispatch(addSessionNotes(notes));

          return { data: { notes } };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_NOTES_TAG],
    }),

    getSessionNoteByKey: builder.query<
      SessionNote,
      { sessionId: string; noteKey: string }
    >({
      async queryFn({ sessionId, noteKey }, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionNotesCollection),
            where("userId", "==", userId),
            where("sessionId", "==", sessionId)
          );

          const querySnapshot = await getDocs(q);
          const { notes } = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          )[0] as GetSessionNotesData;

          const filteredNote = notes.find((note) => note.key === noteKey);

          if (!filteredNote) {
            return { error: `No session notes found for the key: ${noteKey}` };
          }

          return { data: filteredNote };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_NOTES_TAG],
    }),
  }),
});

export const {
  useAddSessionNotesMutation,
  useGetSessionNotesQuery,
  useGetAllSessionNotesQuery,
  useGetSessionNoteByKeyQuery,
} = sessionNotesApi;
