import { AccountType } from "~/state/user/types";

export type BasicData = {
  firstName: string;
  lastName: string;
  location: string;
  prefix: string;
  phone: string;
};

export type PhotoData = {
  image: string;
};

export type TypeData = {
  accountType: AccountType;
};

export type ChurchData = {
  attendance: string;
  churchName: string;
  churchLocation: string;
  churchSize: string;
  churchRole: string;
};

export type ProfileData = BasicData & PhotoData & TypeData & ChurchData;
