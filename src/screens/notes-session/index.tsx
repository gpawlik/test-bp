import * as React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { NotesProps } from "~/navigation/notes-stack/types";

import { HeaderBar } from "~/components/header-bar";
import { SearchInput } from "~/components/search-input";
import { messages as notesMessages } from "~/screens/notes/intl";
import { SortEnum } from "~/state/notes/types";

import { formatMessage } from "~/utils/translation";

import { GroupedNotes } from "./grouped-notes";
import { UngroupedNotes } from "./ungrouped-notes";
import {
  Screen,
  Container,
  TitleBox,
  Title,
  MoreButton,
  Dot,
  SearchBox,
} from "./styles";
import { messages } from "./intl";

export const SessionNotes = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortMethod, setSortMethod] = React.useState<SortEnum>(SortEnum.DESC);
  const [isGrouped, setIsGrouped] = React.useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const onFilterPress = React.useCallback(() => {
    const options = [
      notesMessages.sortNewToOld,
      notesMessages.sortOldToNew,
      isGrouped ? notesMessages.ungroup : notesMessages.group,
      notesMessages.cancel,
    ].map((message) => formatMessage(message));

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 3,
      },
      (selectedIndex?: number) => {
        if (selectedIndex === 0) {
          setSortMethod(SortEnum.DESC);
        }
        if (selectedIndex === 1) {
          setSortMethod(SortEnum.ASC);
        }
        if (selectedIndex === 2) {
          setIsGrouped(!isGrouped);
        }
      }
    );
  }, [showActionSheetWithOptions, isGrouped]);

  const emptyMessage = searchTerm ? messages.emptySearch : messages.empty;
  const showFilterDot = sortMethod !== SortEnum.DESC || isGrouped;

  const navigation = useNavigation<NotesProps["navigation"]>();

  const onPress = React.useCallback(
    (sessionId: string) => {
      navigation.navigate(routes.sessionNotesView, { sessionId });
    },
    [navigation]
  );

  return (
    <Screen>
      <HeaderBar withBackButton />
      <Container>
        <TitleBox>
          <Title>{messages.title}</Title>
          <MoreButton onPress={onFilterPress}>
            <Icon name="filter-list" size={26} />
            {showFilterDot ? <Dot /> : null}
          </MoreButton>
        </TitleBox>

        <SearchBox>
          <SearchInput
            value={searchTerm}
            placeholder={messages.search}
            onChange={setSearchTerm}
          />
        </SearchBox>

        {isGrouped ? (
          <GroupedNotes
            searchTerm={searchTerm}
            sortMethod={sortMethod}
            emptyMessage={emptyMessage}
            onPress={onPress}
          />
        ) : (
          <UngroupedNotes
            searchTerm={searchTerm}
            sortMethod={sortMethod}
            emptyMessage={emptyMessage}
            onPress={onPress}
          />
        )}
      </Container>
    </Screen>
  );
};
