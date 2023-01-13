import { createAction } from "@reduxjs/toolkit";

import { BiblePayload, GetChaptersPayload } from "./types";

export const getFullBible = createAction<BiblePayload>("getFullBible");

export const removeBibleData = createAction<BiblePayload>("removeBibleData");

export const getChapters = createAction<GetChaptersPayload>("getChapters");
