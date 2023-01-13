import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  FlamelinkState,
  FlamelinkMeta,
  Question,
  FlamelinkImage,
} from "./types";

export const initialState: FlamelinkState = {
  data: {},
  questions: [],
  images: [],
};

export const flamelinkSlice = createSlice({
  name: "flamelink",
  initialState,
  reducers: {
    setFlamelinkData: (state, action: PayloadAction<FlamelinkMeta>) => {
      state.data = action.payload;
    },
    setFlamelinkQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setFlamelinkImages: (state, action: PayloadAction<FlamelinkImage[]>) => {
      state.images = action.payload;
    },
  },
});

export const { setFlamelinkData, setFlamelinkQuestions, setFlamelinkImages } =
  flamelinkSlice.actions;

export default flamelinkSlice.reducer;
