import { createSlice } from "@reduxjs/toolkit";

import { GroupsState } from "./types";
import { mockData } from "./mocks";

const initialState: GroupsState = {
  data: mockData,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
});

export default groupsSlice.reducer;
