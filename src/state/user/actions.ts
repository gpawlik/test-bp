import { createAction } from "@reduxjs/toolkit";

import {
  LoginPayload,
  SignupPayload,
  SaveProfilePayload,
  GoogleLoginPayload,
} from "./types";

export const login = createAction<LoginPayload>("login");

export const loginWithApple = createAction("loginWithApple");

export const loginWithGoogle =
  createAction<GoogleLoginPayload>("loginWithGoogle");

export const signup = createAction<SignupPayload>("signup");

export const saveProfile = createAction<SaveProfilePayload>("saveProfile");
