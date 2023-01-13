import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import Constants from "expo-constants";

// Firebase config
const firebaseConfig = {
  apiKey: Constants?.expoConfig?.extra?.apiKey,
  authDomain: Constants?.expoConfig?.extra?.authDomain,
  projectId: Constants?.expoConfig?.extra?.projectId,
  storageBucket: Constants?.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants?.expoConfig?.extra?.messagingSenderId,
  appId: Constants?.expoConfig?.extra?.appId,
  measurementId: Constants?.expoConfig?.extra?.measurementId,
  firebasePrefix: Constants?.expoConfig?.extra?.firebasePrefix,
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();
