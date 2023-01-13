import * as React from "react";
import type { ListenToGodSection } from "~/state/flamelink/types";
import { RichText } from "../rich-text";
import { Question } from "../question";
import { SectionTitle, SubsectionTitle } from "../common";

interface ListenToGodProps {
  listenToGod: ListenToGodSection;
}

export const ListenToGod: React.FC<ListenToGodProps> = ({ listenToGod }) => {
  return (
    <>
      <SectionTitle>{listenToGod?.sectionTitle}</SectionTitle>

      <RichText>{listenToGod?.intro}</RichText>

      <SubsectionTitle>{listenToGod.activate.sectionTitle}</SubsectionTitle>

      <RichText>{listenToGod?.activate.content}</RichText>

      <SubsectionTitle>
        {listenToGod.prayerRequests.sectionTitle}
      </SubsectionTitle>

      <RichText>{listenToGod?.prayerRequests.content}</RichText>

      <SubsectionTitle>
        {listenToGod.personalReflectionQuestions.sectionTitle}
      </SubsectionTitle>

      <RichText>{listenToGod?.personalReflectionQuestions.intro}</RichText>

      {listenToGod?.personalReflectionQuestions.questionRepeater.map(
        (question) => (
          <Question question={question} key={question.uniqueKey} />
        )
      )}
    </>
  );
};
