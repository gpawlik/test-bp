import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NotesStackParamList } from "./";

export type NotesProps = NativeStackScreenProps<NotesStackParamList, "notes">;

export type NotesViewProps = NativeStackScreenProps<
  NotesStackParamList,
  "notes.sessions.view"
>;
