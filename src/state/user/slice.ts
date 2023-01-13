import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserState, User, Profile, UserData } from "./types";

export const initialState: UserState = {
  user: null,
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      const { user, profile } = action.payload;
      if (user) {
        state.user = user;
      }
      if (profile) {
        state.profile = profile;
      }
    },
  },
});

export const { logout, setUser, setProfile, setUserData } = userSlice.actions;

export default userSlice.reducer;
