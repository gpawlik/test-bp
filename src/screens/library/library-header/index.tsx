import React from "react";
import { IconButton } from "react-native-paper";
import { IconSizes } from "~/components/icon";
import { messages } from "../intl";
import {
  LibraryHeaderContainer,
  LibraryHeaderTitle,
  SearchIcon,
} from "./styles";

export function LibraryHeader() {
  return (
    <LibraryHeaderContainer>
      <IconButton icon="filter-variant" size={IconSizes.Large} />

      <LibraryHeaderTitle>{messages.title}</LibraryHeaderTitle>

      <SearchIcon />
    </LibraryHeaderContainer>
  );
}
