import * as React from "react";
import { FlatList } from "react-native";

import { getLastUpdated } from "~/screens/notes/utils";
import { ListItem } from "~/components/list-item";
import { useAppSelector } from "~/state/hooks";
import { getSessionNotesFiltered } from "~/state/notes/selectors";
import { SessionNotesData, SortEnum } from "~/state/notes/types";

import { Section, EmptyText } from "./styles";

interface Props {
  searchTerm: string;
  sortMethod: SortEnum;
  emptyMessage: TextType;
  onPress: (sessionId: string) => void;
}

export const UngroupedNotes = React.memo<Props>(
  ({ searchTerm, sortMethod, emptyMessage, onPress }) => {
    const data: SessionNotesData[] = useAppSelector((state) =>
      getSessionNotesFiltered(state, { searchTerm, sortMethod })
    );

    return data.length ? (
      <Section>
        <FlatList
          data={data}
          renderItem={({
            item: { planTitle, volume, session, sessionId, lastUpdated },
            index,
          }) => {
            const title = `${planTitle}: ${volume}. ${session}`;
            const description = getLastUpdated(lastUpdated);

            return (
              <ListItem
                title={title}
                description={description}
                onPress={() => onPress(sessionId)}
                isLast={index === data.length - 1}
                key={title}
              />
            );
          }}
        />
      </Section>
    ) : (
      <EmptyText>{emptyMessage}</EmptyText>
    );
  }
);
