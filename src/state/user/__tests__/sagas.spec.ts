import { expectSaga } from "redux-saga-test-plan";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { getBlob } from "~/utils/file";
import {
  setUserSaga,
  handleLogin,
  handleSignup,
  handleSaveProfile,
  handleUploadImage,
  handleLoginWithApple,
} from "../sagas";
import { setUserData, setProfile } from "../slice";
import { getUserId } from "../selectors";
import { AccountType } from "../types";

jest.mock("<config>/firebase", () => ({
  auth: {},
}));

describe("setUserSaga", () => {
  it("should call the correct callbacks on login", async () => {
    return expectSaga(setUserSaga, {
      user: {
        createdAt: "",
        displayName: "",
        email: "test@gmail.com",
        emailVerified: false,
        isAnonymous: false,
        lastLoginAt: "",
        phoneNumber: "",
        photoURL: "",
        stsTokenManager: {
          accessToken: "",
          expirationTime: 123,
          refreshToken: "",
        },
        uid: "d7Z7aTUddyP2MypBNY6iJ2Ln3pq1",
      },
    }).put(setUserData);
  });
});

describe("handleLogin", () => {
  it("should call the correct callbacks on login", async () => {
    return expectSaga(handleLogin, {
      type: "",
      payload: {
        email: "test@gmail.com",
        password: "123456",
        onSuccess: console.log,
        onError: console.log,
      },
    })
      .call(signInWithEmailAndPassword)
      .call(console.log);
  });
});

describe("handleSignup", () => {
  it("should call the correct callbacks on signup", async () => {
    return expectSaga(handleSignup, {
      type: "",
      payload: {
        email: "test@gmail.com",
        password: "123456",
        onSuccess: console.log,
        onError: console.log,
      },
    })
      .call(createUserWithEmailAndPassword)

      .call(console.log);
  });
});

describe("handleSaveProfile", () => {
  it("should call the correct callbacks on save profile", async () => {
    return expectSaga(handleSaveProfile, {
      type: "",
      payload: {
        firstName: "",
        lastName: "",
        phone: "",
        location: "",
        image: "",
        churchName: "",
        churchLocation: "",
        churchSize: "",
        churchRole: "",
        accountType: AccountType.Individual,
        onSuccess: console.log,
        onError: console.log,
      },
    })
      .call(handleUploadImage)
      .call(setDoc)
      .put(setProfile)
      .call(console.log);
  });
});

describe("handleUploadImage", () => {
  it("should call the correct callbacks on uploading the image", async () => {
    return expectSaga(handleUploadImage, "image-url")
      .select(getUserId)
      .call(getBlob)
      .call(uploadBytesResumable)
      .call(getDownloadURL);
  });
});

describe("handleLoginWithApple", () => {
  it("should call the correct callbacks on login with Apple", async () => {
    return expectSaga(handleLoginWithApple)
      .call(Crypto.digestStringAsync)
      .call(AppleAuthentication.signInAsync)
      .call(signInWithCredential)
      .call(setUserSaga);
  });
});
