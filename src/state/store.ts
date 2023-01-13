import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistCombineReducers } from "reduxjs-toolkit-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  bibleSaga,
  bibleDownloadSaga,
  bibleDeleteSaga,
  bibleChangeSaga,
  bibleSlice,
  chaptersSaga,
} from "./bible";
import { startupSaga, startupSlice } from "./startup";
import {
  authSaga,
  loginSaga,
  logoutSaga,
  signupSaga,
  saveProfileSaga,
  loginWithAppleSaga,
  loginWithGoogleSaga,
  userSlice,
} from "./user";
import {
  getFlamelinkDataSaga,
  flamelinkSlice,
  flamelinkApi,
} from "./flamelink";
import { groupsSlice } from "./groups";
import { contentProgressApi } from "./content-progress";
import { sessionNotesApi } from "./session-notes";
import { notesSlice } from "./notes";

const sagas = {
  bibleSaga,
  bibleDownloadSaga,
  bibleDeleteSaga,
  bibleChangeSaga,
  chaptersSaga,
  startupSaga,
  authSaga,
  loginSaga,
  logoutSaga,
  signupSaga,
  saveProfileSaga,
  loginWithAppleSaga,
  loginWithGoogleSaga,
  getFlamelinkDataSaga,
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["startup"],
};

function* rootSaga() {
  yield all(Object.values(sagas).map((saga) => fork(saga)));
}

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = {
  bible: bibleSlice.reducer,
  startup: startupSlice.reducer,
  user: userSlice.reducer,
  groups: groupsSlice.reducer,
  flamelink: flamelinkSlice.reducer,
  notes: notesSlice.reducer,
  [flamelinkApi.reducerPath]: flamelinkApi.reducer,
  [contentProgressApi.reducerPath]: contentProgressApi.reducer,
  [sessionNotesApi.reducerPath]: sessionNotesApi.reducer,
};

const storeAPIMiddlewares = [
  contentProgressApi.middleware,
  flamelinkApi.middleware,
  sessionNotesApi.middleware,
];

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => {
    return [
      ...getDefaultMiddleWare({
        thunk: true,
        serializableCheck: false,
      })
        .prepend(sagaMiddleware)
        .concat(storeAPIMiddlewares),
    ];
  },
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
