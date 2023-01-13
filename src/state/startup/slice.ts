import { createSlice } from "@reduxjs/toolkit";

export interface StartupState {
  isAppReady: boolean;
  splashScreenLoaded: boolean;
  resourcesLoaded: boolean;
}

const initialState: StartupState = {
  isAppReady: true,
  splashScreenLoaded: false,
  resourcesLoaded: false,
};

export const startupSlice = createSlice({
  name: "startup",
  initialState,
  reducers: {
    appStartedLoading: (state) => {
      state.isAppReady = false;
    },
    appFinishedLoading: (state) => {
      state.isAppReady = true;
    },
    splashScreenFinishedLoading: (state) => {
      state.splashScreenLoaded = true;
    },
    resourcesFinishedLoading: (state) => {
      state.resourcesLoaded = true;
    },
  },
});

export const {
  appStartedLoading,
  appFinishedLoading,
  splashScreenFinishedLoading,
  resourcesFinishedLoading,
} = startupSlice.actions;

export default startupSlice.reducer;
