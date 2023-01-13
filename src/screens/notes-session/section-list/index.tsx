import * as React from "react";

import { useAppSelector } from "~/state/hooks";
import { getSessionNotesByPlanId } from "~/state/notes/selectors";
import { ListItem } from "~/components/list-item";
import { getLastUpdated } from "~/screens/notes/utils";

interface Props {
  planId: string;
  searchTerm: string;
  sortMethod: string;
  onPress: (sessionId: string) => void;
}

export const SectionList = ({
  planId,
  searchTerm,
  sortMethod,
  onPress,
}: Props) => {
  const planNotes = useAppSelector((state) =>
    getSessionNotesByPlanId(state, { planId, searchTerm, sortMethod })
  );

  return (
    <>
      {planNotes.map(({ session, sessionId, volume, lastUpdated }, index) => {
        const title = `${volume}. ${session}`;
        const description = getLastUpdated(lastUpdated);

        return (
          <ListItem
            title={title}
            description={description}
            onPress={() => onPress(sessionId)}
            isLast={index === planNotes.length - 1}
            key={title}
            numberOfLines={1}
          />
        );
      })}
    </>
  );
};
