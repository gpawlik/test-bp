import Constants from "expo-constants";
import { SagaIterator } from "redux-saga";
import { call, takeLatest, put, select } from "redux-saga/effects";
import { doc, getDoc } from "firebase/firestore";

import { database } from "<config>/firebase";
import { appStartedLoading } from "~/state/startup/slice";
import { chunkArray } from "~/utils/arrays";
import { logError } from "~/utils/logger";
import { setUserData } from "~/state/user";

import {
  setFlamelinkData,
  setFlamelinkImages,
  setFlamelinkQuestions,
} from "./slice";
import { getPlans } from "./selectors";
import { getFlamelinkMedia } from "./side-effects";
import { FlamelinkMediaFile, PlansContent } from "./types";

const prefix = Constants?.expoConfig?.extra?.firebasePrefix || "stg";
const dataCollection = `cms_content_${prefix}`;
const dataDocument = "data";
const questionsDocument = "questions";

export function* getFlamelinkData(): SagaIterator {
  try {
    // Get the Flamelink data from Firebase
    const dataRef = doc(database, dataCollection, dataDocument);
    // @ts-ignore
    const dataSnapshot = yield call(getDoc, dataRef);
    if (dataSnapshot.exists()) {
      const data = dataSnapshot.data();

      if (data.results) {
        yield put(setFlamelinkData(data.results));
      }
    }

    // Get the Flamelink questions from Firebase
    const questionsRef = doc(database, dataCollection, questionsDocument);
    // @ts-ignore
    const questionsSnapshot = yield call(getDoc, questionsRef);
    if (questionsSnapshot.exists()) {
      const data = questionsSnapshot.data();

      if (data.questions) {
        yield put(setFlamelinkQuestions(data.questions));
      }
    }

    yield call(handleGetFlamelinkImages);
  } catch (e) {
    logError(e);
  }
}

export function* handleGetFlamelinkImages(): SagaIterator {
  try {
    const plans: PlansContent[] = yield select(getPlans);
    const plansCovers = plans?.map((plan) => plan.cover[0]).filter(Boolean);
    const plansLogos = plans?.map((plan) => plan.logo[0]).filter(Boolean);

    // splitting into chunks of 10 because of the firestore query limit
    const chunkedCoversIds = chunkArray(plansCovers, 10);
    const chunkedLogosIds = chunkArray(plansLogos, 10);

    const coverFiles: FlamelinkMediaFile[] = yield call(
      getFlamelinkMedia,
      chunkedCoversIds
    );
    const logoFiles: FlamelinkMediaFile[] = yield call(
      getFlamelinkMedia,
      chunkedLogosIds
    );

    const flamelinkImages = plans.map((plan) => {
      const cover = coverFiles?.find(
        (image) => image.id === plan.cover[0]
      )?.file;
      const logo = logoFiles?.find((image) => image.id === plan.logo[0])?.file;

      return { planId: plan.id, cover, logo };
    });

    yield put(setFlamelinkImages(flamelinkImages));
  } catch (e) {
    logError(e);
  }
}

export function* getFlamelinkDataSaga() {
  yield takeLatest(appStartedLoading.type, getFlamelinkData);
  // trying fetching upon user login because we can't get the data without authentication
  yield takeLatest(setUserData.type, getFlamelinkData);
}
