import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { useAppSelector } from "~/state/hooks";
import {
  getBibleNotes,
  getPersonalNotes,
  getSessionNotesCount,
} from "~/state/notes/selectors";
import { useGetAllSessionNotesQuery } from "~/state/session-notes/api";
import { HeaderBar } from "~/components/header-bar";
import { Fab } from "~/components/fab";
import { NotesProps } from "~/navigation/notes-stack/types";

import { Note } from "./components/note";

import { Screen, Container, Title, Section } from "./styles";
import { messages } from "./intl";

export const Notes = () => {
  const sessionNotesCount = useAppSelector(getSessionNotesCount);
  const bibleNotes = useAppSelector(getBibleNotes);
  const personalNotes = useAppSelector(getPersonalNotes);

  const { isLoading } = useGetAllSessionNotesQuery(null);

  const navigation = useNavigation<NotesProps["navigation"]>();

  const onSessionNotes = React.useCallback(() => {
    navigation.navigate(routes.sessionNotes);
  }, [navigation]);

  return (
    <Screen>
      <HeaderBar withBackButton />
      <Container>
        <Title>{messages.title}</Title>

        <Section>
          <Note
            title={messages.sessionNotes}
            count={sessionNotesCount}
            onPress={onSessionNotes}
            isLoading={isLoading}
          />

          <Note
            title={messages.bibleNotes}
            count={bibleNotes.length}
            onPress={() => {}}
          />

          <Note
            title={messages.personalNotes}
            count={personalNotes.length}
            onPress={() => {}}
          />
        </Section>
      </Container>
      <Fab onPress={() => {}} />
    </Screen>
  );
};
