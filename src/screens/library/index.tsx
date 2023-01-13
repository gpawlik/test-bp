import * as React from "react";
import { HeaderBar } from "~/components/header-bar";
import { colors } from "~/styles/theme";
import { LibraryHeader } from "./library-header";
import { Audiences } from "./audiences";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LibraryStackParamList } from "~/navigation/library-stack";

export type LibraryProps = NativeStackScreenProps<
  LibraryStackParamList,
  "library"
>;

export const Library: React.FC<LibraryProps> = () => {
  return (
    <>
      <HeaderBar iconColor={colors.black} withBackButton={false} />

      <LibraryHeader />

      <Audiences />
    </>
  );
};
