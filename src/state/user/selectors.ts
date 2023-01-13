import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "./types";

const getState = (state: RootState) => state.user;

export const getUser: (state: RootState) => User | null = createSelector(
  getState,
  (state) => state?.user
);

export const getUserId: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.user?.uid || ""
);

export const getUserToken: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.user?.stsTokenManager.accessToken || ""
);

export const getUserDisplayName: (state: RootState) => string = createSelector(
  getState,
  (state) => {
    return state?.user?.displayName || "";
  }
);

export const getUserFirstName: (state: RootState) => string = createSelector(
  [getState, getUserDisplayName],
  (state, displayName) => {
    return state?.profile?.firstName || displayName.split(" ")[0] || "";
  }
);

export const getUserLastName: (state: RootState) => string = createSelector(
  [getState, getUserDisplayName],
  (state, displayName) => {
    return state?.profile?.lastName || displayName.split(" ")[1] || "";
  }
);

export const getProfileImage: (state: RootState) => string = createSelector(
  getState,
  (state) => state?.profile?.image || state?.user?.photoURL || ""
);

export const getHasProfile: (state: RootState) => boolean = createSelector(
  getState,
  (state) => !!state?.profile
);
