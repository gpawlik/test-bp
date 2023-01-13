import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LibraryStackParamList } from "~/navigation/library-stack";

export type SessionProps = NativeStackScreenProps<
  LibraryStackParamList,
  "session"
>;

export type SessionRouteProp = SessionProps["route"];
