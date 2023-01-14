import { SagaIterator } from "redux-saga";
import { put, take, takeLatest, all } from "redux-saga/effects";

import {
  appStartedLoading,
  appFinishedLoading,
  splashScreenFinishedLoading,
  resourcesFinishedLoading,
} from "./slice";

export function* handleStartLoading(): SagaIterator {
  // Startup requests can be done here before hiding the splash screen
  yield all([
    // take(splashScreenFinishedLoading),
    take(resourcesFinishedLoading),
  ]);

  yield put(appFinishedLoading());
}

export function* startupSaga() {
  yield takeLatest(appStartedLoading.type, handleStartLoading);
}
