import * as React from "react";
import { useAppSelector } from "~/state/hooks";
import { getDevotionsById } from "~/state/flamelink/selectors";

import { SectionTitle } from "../common";
import { Question } from "../question";
import { RichText } from "../rich-text";
import { Scripture } from "../scripture";

interface DayProps {
  dayId: string;
}

export const Day: React.FC<DayProps> = ({ dayId }) => {
  const day = useAppSelector((state) => getDevotionsById(state, dayId));

  return (
    <>
      <SectionTitle>{day?.title || ""}</SectionTitle>

      <Scripture scripture={day?.scripture || ""} />

      <RichText>{day?.content || ""}</RichText>

      <>
        {day?.questions?.length &&
          day?.questions.map((question) => (
            <Question question={question} key={question.uniqueKey} />
          ))}
      </>
    </>
  );
};
