import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatState, Message } from "./types";

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessages } = chatSlice.actions;

export default chatSlice.reducer;
