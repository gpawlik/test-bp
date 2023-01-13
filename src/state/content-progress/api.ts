import Constants from "expo-constants";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "<config>/firebase";
import {
  AddSessionProgressParams,
  GetProgressByPlanData,
  ProgressState,
  SessionProgress,
  UpdateSessionProgressParams,
} from "./types";
import {
  getNewSessionProgressToStore,
  getNumberOfDaysCompleted,
} from "./utils";
import type { RootState } from "../store";

const suffix = Constants?.expoConfig?.extra?.firebasePrefix || "stg";
const sessionProgressCollection = `session_progress_${suffix}`;
const SESSION_PROGRESS_TAG = "SessionProgress";

export const contentProgressApi = createApi({
  reducerPath: "contentProgressApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [SESSION_PROGRESS_TAG],
  endpoints: (builder) => ({
    addSessionProgress: builder.mutation<string, AddSessionProgressParams>({
      async queryFn(addSessionProgressParams, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const sessionProgressToStore = getNewSessionProgressToStore({
            userId,
            ...addSessionProgressParams,
          });

          await addDoc(
            collection(database, sessionProgressCollection),
            sessionProgressToStore
          );

          return { data: "Session progress created successfully" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [SESSION_PROGRESS_TAG],
    }),

    updateSessionProgress: builder.mutation<
      string,
      UpdateSessionProgressParams
    >({
      async queryFn(
        { sessionId, dayKey, shouldMarkDayAsComplete },
        { getState }
      ) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionProgressCollection),
            where("userId", "==", userId),
            where("sessionId", "==", sessionId)
          );

          const querySnapshot = await getDocs(q);

          const data = querySnapshot.docs.map((dataDoc) =>
            dataDoc.data()
          ) as SessionProgress[];

          const newDaysProgressToStore = data[0].days.map((day) => {
            if (day.key === dayKey) {
              const newDayState = shouldMarkDayAsComplete
                ? ProgressState.Completed
                : day.state === ProgressState.NotStarted
                ? ProgressState.InProgress
                : day.state;

              return { key: day.key, state: newDayState };
            }

            return day;
          });

          const shouldMarkSessionAsComplete = !newDaysProgressToStore.find(
            (day) => day.state !== ProgressState.Completed
          );
          const newSessionState = shouldMarkSessionAsComplete
            ? ProgressState.Completed
            : ProgressState.InProgress;

          const currentDocId = querySnapshot.docs[0].id;

          await updateDoc(
            doc(database, sessionProgressCollection, currentDocId),
            {
              days: newDaysProgressToStore,
              state: newSessionState,
            } as Partial<SessionProgress>
          );

          return { data: "Session progress updated successfully" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [SESSION_PROGRESS_TAG],
    }),

    getProgressByPlan: builder.query<GetProgressByPlanData, string>({
      async queryFn(planId, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionProgressCollection),
            where("userId", "==", userId),
            where("planId", "==", planId)
          );

          const querySnapshot = await getDocs(q);
          const planProgress = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          ) as GetProgressByPlanData["planProgress"];

          const currentSessionInProgress = planProgress.find(
            ({ state }) => state === ProgressState.InProgress
          );

          const hasSessionsCompleted = !!planProgress.filter(
            ({ state }) => state === ProgressState.Completed
          ).length;

          return {
            data: {
              planProgress,
              currentSessionInProgress,
              numberOfDaysCompleted: getNumberOfDaysCompleted(planProgress),
              hasSessionsCompleted,
              shouldDisplayMainButton:
                currentSessionInProgress ||
                (!currentSessionInProgress && !hasSessionsCompleted),
            } as GetProgressByPlanData,
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_PROGRESS_TAG],
    }),

    getProgress: builder.query<SessionProgress[], string>({
      async queryFn(_, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionProgressCollection),
            where("userId", "==", userId)
          );

          const querySnapshot = await getDocs(q);
          const planProgress = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          ) as GetProgressByPlanData["planProgress"];

          const sessionsInProgress = planProgress.filter(
            ({ state }) => state === ProgressState.InProgress
          );

          return {
            data: sessionsInProgress as SessionProgress[],
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_PROGRESS_TAG],
    }),

    getProgressBySession: builder.query<SessionProgress, string>({
      async queryFn(sessionId, { getState }) {
        try {
          const userId: string = (getState() as RootState).user.user?.uid ?? "";

          const q = query(
            collection(database, sessionProgressCollection),
            where("userId", "==", userId),
            where("sessionId", "==", sessionId)
          );

          const querySnapshot = await getDocs(q);
          const sessionProgress = querySnapshot.docs.map((snapshotDoc) =>
            snapshotDoc.data()
          ) as GetProgressByPlanData["planProgress"];

          const filteredSession: SessionProgress[] =
            sessionProgress.filter(
              (progress) => progress.sessionId === sessionId
            ) ?? undefined;

          if (!filteredSession?.[0]) {
            throw new Error(
              `No session progress found with session ${sessionId}`
            );
          }

          return {
            data: filteredSession?.[0],
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [SESSION_PROGRESS_TAG],
    }),
  }),
});

export const {
  useAddSessionProgressMutation,
  useUpdateSessionProgressMutation,
  useGetProgressByPlanQuery,
  useGetProgressQuery,
  useGetProgressBySessionQuery,
} = contentProgressApi;
