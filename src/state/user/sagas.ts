import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { eventChannel, SagaIterator } from "redux-saga";
import { takeEvery, takeLatest, put, call, select } from "redux-saga/effects";
import {
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithCredential,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth, database, storage } from "<config>/firebase";
import { getBlob } from "~/utils/file";

import {
  login,
  signup,
  saveProfile,
  loginWithApple,
  loginWithGoogle,
} from "./actions";
import { logout, setProfile, setUserData, initialState } from "./slice";
import { getHasProfile, getUserId } from "./selectors";
import {
  User,
  LoginSagaPayload,
  SignupSagaPayload,
  SaveProfileSagaPayload,
  GoogleLoginAction,
} from "./types";

const prefix = Constants?.expoConfig?.extra?.firebasePrefix || "stg";
const usersCollection = `users_${prefix}`;
const profileImageFolder = `profile_${prefix}`;

const createAuthStateChannel = () => {
  return eventChannel((emit) => {
    return onAuthStateChanged(
      auth,
      (user) => {
        emit({
          user,
        });
      },
      (error) => emit({ error })
    );
  });
};

export const setUserSaga = function* ({ user }: { user: User }): SagaIterator {
  if (!user) {
    yield put(setUserData(initialState));
    return;
  }
  try {
    const alreadyHasProfile = yield select(getHasProfile);
    if (alreadyHasProfile) {
      // We don't need to re-fetch the user profile every time
      yield put(setUserData({ user }));
      return;
    }

    const docRef = doc(database, usersCollection, user.uid);
    // @ts-ignore
    const profile = yield call(getDoc, docRef);
    if (profile.exists()) {
      yield put(setUserData({ user, profile: profile.data() }));
    } else {
      yield put(setUserData({ user }));
    }
  } catch (e) {
    yield put(setUserData(initialState));
  }
};

export const authSaga = function* () {
  try {
    const authStateChannel = createAuthStateChannel();

    yield takeEvery(authStateChannel, setUserSaga);
  } catch (e) {
    yield put(setUserData(initialState));
  }
};

export function* handleLogin({
  payload: { email, password, onSuccess, onError },
}: LoginSagaPayload): SagaIterator {
  try {
    yield call(signInWithEmailAndPassword, auth, email, password);
    yield call(onSuccess);
  } catch (e: any) {
    yield call(onError, e?.message);
  }
}

export const loginSaga = function* () {
  yield takeLatest(login.type, handleLogin);
};

export function* handleLogout(): SagaIterator {
  try {
    yield call(signOut, auth);
  } catch (e) {
    console.warn(e);
  }
}

export const logoutSaga = function* () {
  yield takeLatest(logout.type, handleLogout);
};

export function* handleSignup({
  payload: { email, password, onSuccess, onError },
}: SignupSagaPayload): SagaIterator {
  try {
    yield call(createUserWithEmailAndPassword, auth, email, password);
    yield call(onSuccess);
  } catch (e: any) {
    yield call(onError, e?.message);
  }
}

export const signupSaga = function* () {
  yield takeLatest(signup.type, handleSignup);
};

export function* handleUploadImage(uri: string): SagaIterator {
  try {
    const uid = yield select(getUserId);

    const storageRef = ref(storage, `${profileImageFolder}/${uid}.jpg`);

    const blob: Blob = yield call(getBlob, uri);

    // There might be some issue with uploading the files with Firebase JS SDK and Expo that we
    // should keep an eye on: https://github.com/firebase/firebase-js-sdk/issues/5848#issuecomment-1279292900
    // @ts-ignore
    yield call(uploadBytesResumable, storageRef, blob);
    // @ts-ignore
    const profileUrl = yield call(getDownloadURL, storageRef);

    return profileUrl;
  } catch (e: any) {
    console.log(e);
    return "";
  }
}

export function* handleSaveProfile({
  payload: { onSuccess, onError, ...data },
}: SaveProfileSagaPayload): SagaIterator {
  try {
    const uid = yield select(getUserId);
    const profileUrl = yield call(handleUploadImage, data.image);

    const docRef = doc(database, usersCollection, uid);

    const userData = {
      ...data,
      image: profileUrl,
    };

    // @ts-ignore
    yield call(setDoc, docRef, userData, { merge: true });
    yield put(setProfile(data));
    yield call(onSuccess);
  } catch (e: any) {
    yield call(onError, e?.message);
  }
}

export const saveProfileSaga = function* () {
  yield takeLatest(saveProfile.type, handleSaveProfile);
};

export function* handleLoginWithApple(): SagaIterator {
  try {
    const csrf = Math.random().toString(36).substring(2, 15);
    const nonce = Math.random().toString(36).substring(2, 10);
    const hashedNonce = yield call(
      Crypto.digestStringAsync,
      Crypto.CryptoDigestAlgorithm.SHA256,
      nonce
    );

    const appleCredential = yield call(AppleAuthentication.signInAsync, {
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      state: csrf,
      nonce: hashedNonce,
    });
    const { identityToken, fullName } = appleCredential;

    if (identityToken) {
      const provider = new OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });
      const { user } = yield call(signInWithCredential, auth, credential);
      const { givenName, familyName } = fullName || {};
      const displayName =
        givenName && familyName ? `${givenName} ${familyName}` : "";

      yield call(setUserSaga, { user: { ...user, displayName } });
    }
  } catch (e: any) {
    console.warn(e?.message);
  }
}

export const loginWithAppleSaga = function* () {
  yield takeLatest(loginWithApple.type, handleLoginWithApple);
};

export function* handleLoginWithGoogle({
  payload: { idToken },
}: GoogleLoginAction): SagaIterator {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    yield call(signInWithCredential, auth, credential);
  } catch (e: any) {
    console.warn(e);
  }
}

export const loginWithGoogleSaga = function* () {
  yield takeLatest(loginWithGoogle.type, handleLoginWithGoogle);
};
