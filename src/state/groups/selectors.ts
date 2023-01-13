import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Group } from "./types";
import { mockData } from "./mocks";

const getState = (state: RootState) => state.groups;

export const getGroups: (state: RootState) => Group[] = createSelector(
  getState,
  (state) => mockData || state?.data || []
);

export const getGroupById: (
  state: RootState,
  groupId: string
) => Group | undefined = createSelector(
  [getGroups, (_, props) => props],
  (groups, groupId) => {
    return groups.find((group: Group) => group.id === groupId);
  }
);
