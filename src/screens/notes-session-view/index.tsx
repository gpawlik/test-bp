import * as React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { FlatList, Text, Share } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useAppSelector } from "~/state/hooks";
import { getSessionNotesBySessionId } from "~/state/notes/selectors";
import { HeaderBar } from "~/components/header-bar";
import { NotesViewProps } from "~/navigation/notes-stack/types";
import { getLastUpdated } from "~/screens/notes/utils";

import {
  Screen,
  Container,
  HeaderBox,
  TitleBox,
  Title,
  MoreButton,
  LastEdited,
  Section,
  QuestionBox,
  Prefix,
  Question,
  Answer,
} from "./styles";
import { messages } from "./intl";

export const SessionNotesView = () => {
  const {
    params: { sessionId },
  } = useRoute<NotesViewProps["route"]>();

  const notes = useAppSelector((state) =>
    getSessionNotesBySessionId(state, sessionId)
  );

  const title = notes
    ? `${notes?.planTitle}: ${notes?.volume} ${notes?.session}`
    : "";
  const data = React.useMemo(() => notes?.notes || [], [notes]);

  const description = getLastUpdated(notes?.lastUpdated);

  const shareNote = React.useCallback(async () => {
    const message = data
      .map(({ question, note }) => `Q: ${question} \n ${note} \n\n`)
      .join("");

    await Share.share({
      message,
    });
  }, [data]);

  return (
    <Screen>
      <HeaderBar withBackButton backButtonText={messages.backButton} />
      <Container>
        <HeaderBox>
          <TitleBox>
            <Title>{title}</Title>
            <MoreButton onPress={shareNote}>
              <Icon name="more-horiz" size={24} />
            </MoreButton>
          </TitleBox>

          <LastEdited>{description}</LastEdited>
        </HeaderBox>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <Section>
                <QuestionBox>
                  <Text>
                    <Prefix>Q: </Prefix>
                    <Question>{item.question}</Question>
                  </Text>
                </QuestionBox>
                <Answer>{item.note}</Answer>
              </Section>
            );
          }}
        />
      </Container>
    </Screen>
  );
};
