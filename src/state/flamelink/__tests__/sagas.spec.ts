import { expectSaga } from "redux-saga-test-plan";
import { signInWithCredential } from "firebase/auth";
import { chunkArray } from "~/utils/arrays";
import { handleGetFlamelinkImages } from "../sagas";
import { getPlans } from "../selectors";
import { setFlamelinkImages } from "../slice";
import { getFlamelinkMedia } from "../side-effects";

jest.mock("<config>/firebase", () => ({
  auth: {},
}));

describe("handleGetFlamelinkImages", () => {
  it("should call the correct sagas to get the image ids", async () => {
    const mockedPlanCovers = [
      "IqG8PjgpaMzEVdHsJmu0",
      "mRSLqwHyCQ3RPqXbcLVt",
      "fiflMlps2KLTH4MIVmHH",
    ];
    const mockedLogoCovers = [
      "YywUwRsjg006noe5xlXC",
      "UUmMyC3I69VLWRV13mx",
      "QHQBoMZgliSHCrgLgom6",
    ];
    const chunkedCoverIds = chunkArray(mockedPlanCovers, 10);
    const chunkedLogoIds = chunkArray(mockedLogoCovers, 10);

    return expectSaga(handleGetFlamelinkImages)
      .select(getPlans)
      .call(getFlamelinkMedia, chunkedCoverIds)
      .call(getFlamelinkMedia, chunkedLogoIds)
      .call(signInWithCredential)
      .put(setFlamelinkImages);
  });
});
