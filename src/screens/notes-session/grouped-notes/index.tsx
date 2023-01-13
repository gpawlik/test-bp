import * as React from "react";
import { FlatList } from "react-native";

import { useAppSelector } from "~/state/hooks";
import { getSessionNotesPlans } from "~/state/notes/selectors";
import { SortEnum } from "~/state/notes/types";

import { SectionList } from "../section-list";
import { Section, SectionTitleBox, SectionTitle, EmptyText } from "./styles";

interface Props {
  searchTerm: string;
  sortMethod: SortEnum;
  emptyMessage: TextType;
  onPress: (sessionId: string) => void;
}

export const GroupedNotes = React.memo<Props>(
  ({ searchTerm, sortMethod, emptyMessage, onPress }) => {
    const data = useAppSelector((state) =>
      getSessionNotesPlans(state, { searchTerm, sortMethod })
    );

    return data.length ? (
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Section>
              <SectionTitleBox>
                <SectionTitle>{item.title}</SectionTitle>
              </SectionTitleBox>
              <SectionList
                planId={item.id}
                searchTerm={searchTerm}
                sortMethod={sortMethod}
                onPress={onPress}
              />
            </Section>
          );
        }}
      />
    ) : (
      <EmptyText>{emptyMessage}</EmptyText>
    );
  }
);
