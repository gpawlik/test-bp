import { createSelector } from "@reduxjs/toolkit";

import { SessionNotes } from "~/state/session-notes";
import {
  getFlamelinkData,
  getFlamelinkQuestions,
} from "~/state/flamelink/selectors";

import { RootState } from "../store";
import { SessionNotesData, SortEnum, PlanData } from "./types";

const getState = (state: RootState) => state.notes;

export const getSessionNotes: (state: RootState) => SessionNotes[] =
  createSelector(getState, (state) => state?.session || []);

export const getBibleNotes: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.bible || []
);

export const getPersonalNotes: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.personal || []
);

export const getSessionNotesCount: (state: RootState) => number =
  createSelector(getSessionNotes, (sessionNotes) =>
    sessionNotes.reduce((acc, { notes }) => {
      return notes ? acc + notes.length : acc;
    }, 0)
  );

export const getSessionNotesData: (state: RootState) => SessionNotesData[] =
  createSelector(
    [getSessionNotes, getFlamelinkData, getFlamelinkQuestions],
    (sessionNotes, data, questions) => {
      return sessionNotes.map((note) => {
        const noteSession = data.sessions?.find(
          (session) => session.id === note.sessionId
        );
        const noteVolume = data.volumes?.find((volume) =>
          volume.sessions.includes(noteSession?.id || "")
        );
        const notePlan = data.plans?.find((plan) =>
          plan.volumes.includes(noteVolume?.id || "")
        );

        const notes =
          note.notes?.map((item) => {
            const question = questions?.find((q) => q.uniqueKey === item.key);
            return {
              question: question?.question || "",
              note: item.note,
            };
          }) || [];

        return {
          planId: notePlan?.id || "",
          planTitle: notePlan?.title || "",
          volume: noteVolume?.title || "",
          sessionId: noteSession?.id || "",
          session: noteSession?.title || "",
          lastUpdated: note.lastUpdated,
          notes,
        };
      });
    }
  );

const hasSearchTerm = (
  { planTitle, volume, session }: SessionNotesData,
  searchTerm: string
) =>
  [planTitle, volume, session]
    .join("")
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

const sortData = (data: SessionNotesData[], sortMethod: string) => {
  return data.sort((a, b) =>
    sortMethod === SortEnum.ASC
      ? a.lastUpdated - b.lastUpdated
      : b.lastUpdated - a.lastUpdated
  );
};

export const getSessionNotesFiltered: (
  state: RootState,
  { searchTerm, sortMethod }: { searchTerm: string; sortMethod: string }
) => SessionNotesData[] = createSelector(
  [getSessionNotesData, (_, props) => props],
  (data, { searchTerm, sortMethod }) => {
    const sortedData = sortData(data, sortMethod);
    return sortedData.filter((item) => hasSearchTerm(item, searchTerm));
  }
);

export const getSessionNotesPlans: (
  state: RootState,
  { searchTerm, sortMethod }: { searchTerm: string; sortMethod: string }
) => PlanData[] = createSelector(
  [getSessionNotesData, (_, props) => props],
  (data, { searchTerm, sortMethod }) => {
    const sortedData = sortData(data, sortMethod);
    return sortedData.reduce((acc: PlanData[], item) => {
      if (
        !acc.find(({ id }) => id === item.planId) &&
        hasSearchTerm(item, searchTerm)
      ) {
        return [...acc, { id: item.planId, title: item.planTitle }];
      }
      return acc;
    }, []);
  }
);

export const getSessionNotesByPlanId: (
  state: RootState,
  {
    planId,
    searchTerm,
  }: { planId: string; searchTerm: string; sortMethod: string }
) => SessionNotesData[] = createSelector(
  [getSessionNotesData, (_, props) => props],
  (data, { planId, searchTerm, sortMethod }) => {
    const sortedData = sortData(data, sortMethod);
    return sortedData.filter(
      (item) => item.planId === planId && hasSearchTerm(item, searchTerm)
    );
  }
);

export const getSessionNotesBySessionId: (
  state: RootState,
  sessionId: string
) => SessionNotesData | undefined = createSelector(
  [getSessionNotesData, (_, props) => props],
  (data, sessionId) => {
    return data.find((item) => item.sessionId === sessionId);
  }
);
