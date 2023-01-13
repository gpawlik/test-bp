import { expectSaga } from "redux-saga-test-plan";

import { setUserData } from "~/state/user/slice";
import { handleStartLoading } from "../sagas";
import {
  appFinishedLoading,
  splashScreenFinishedLoading,
  resourcesFinishedLoading,
} from "../slice";

describe("handleStartLoading", () => {
  it("should hide the splash screen once the app is ready", async () => {
    return expectSaga(handleStartLoading)
      .take(splashScreenFinishedLoading)
      .take(resourcesFinishedLoading)
      .take(setUserData)
      .put(appFinishedLoading())
  });
});
