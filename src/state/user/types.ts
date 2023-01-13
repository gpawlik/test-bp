export interface UserState {
  user: User | null;
  profile: Profile | null;
}

export enum AccountType {
  Individual = "individual",
  Church = "church",
}

export type User = {
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  photoURL: string;
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  churchName: string;
  churchLocation: string;
  churchSize: string;
  churchRole: string;
  accountType: AccountType;
  image: string;
};

export type UserData = {
  user?: User | null;
  profile?: Profile | null;
};

export type LoginPayload = {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: (error: string) => void;
};

export type LoginSagaPayload = {
  type: string;
  payload: LoginPayload;
};

export type SignupPayload = {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: (error: string) => void;
};

export type SignupSagaPayload = {
  type: string;
  payload: SignupPayload;
};

export type SaveProfilePayload = Profile & {
  onSuccess: () => void;
  onError: (error: string) => void;
};

export type SaveProfileSagaPayload = {
  type: string;
  payload: SaveProfilePayload;
};

export type GoogleLoginPayload = {
  idToken: string;
};

export type GoogleLoginAction = {
  type: string;
  payload: GoogleLoginPayload;
  meta: any;
  error: any;
};
