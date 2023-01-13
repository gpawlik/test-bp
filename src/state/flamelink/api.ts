import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDoc, doc } from "firebase/firestore";

import { database } from "<config>/firebase";

import type { Session, SessionData } from "./types";

export const flamelinkApi = createApi({
  reducerPath: "flamelinkApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSession: builder.query<Session, string>({
      queryFn: async (sessionId) => {
        try {
          const docRef = doc(
            database,
            "fl_data",
            "data",
            "sessions",
            sessionId
          );

          const querySnapshot = await getDoc(docRef);

          return querySnapshot.data() as SessionData;
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetSessionQuery } = flamelinkApi;
