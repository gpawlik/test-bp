import { createSelector } from "@reduxjs/toolkit";

import { getUserId } from "~/state/user/selectors";
import { getGroups } from "~/state/groups/selectors";
import { Group } from "~/state/groups/types";

import { RootState } from "../store";
import { Message, GroupMessage } from "./types";
import { data } from "./mock";

const getState = (state: RootState) => state.chat;

export const getChatMessages: (state: RootState) => Message[] = createSelector(
  getState,
  () => data
);

export const getSortedChatMessages: (state: RootState) => Message[] =
  createSelector(getChatMessages, (messages) =>
    messages.sort((a, b) => b.timestamp - a.timestamp)
  );

export const getChatMessagesByGroup: (state: RootState) => GroupMessage[] =
  createSelector(
    [getSortedChatMessages, getGroups, getUserId],
    (messages, groups, userId) =>
      messages.map(
        ({ id, groupId, sender, timestamp, content: text }, index) => {
          const groupData = groups.find(
            (group) => group.id === groupId
          ) as Group;
          const senderName = sender?.firstName || "";
          const isCurrentUser = sender?.id === userId;
          const isRead = !!index;

          return {
            id,
            senderName,
            text,
            timestamp,
            groupId,
            groupName: groupData?.name || "",
            groupUri: groupData?.uri || "",
            isCurrentUser,
            isRead,
          };
        }
      )
  );
