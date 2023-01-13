import * as React from "react";
import type { ConsiderSection } from "~/state/flamelink/types";
import { SectionTitle, SubsectionTitle } from "../common";
import { RichText } from "../rich-text";
import { Question } from "../question";
import { Scripture } from "../scripture";

interface ConsiderProps {
  consider: ConsiderSection;
}

export const Consider: React.FC<ConsiderProps> = ({ consider }) => {
  return (
    <>
      <SectionTitle>{consider?.sectionTitle}</SectionTitle>

      <RichText>{consider?.intro}</RichText>

      <>
        {consider.subsectionRepeater.map((subsection, index) => (
          <React.Fragment key={`subsection-${index}`}>
            <SubsectionTitle>{subsection.title}</SubsectionTitle>

            <RichText>{subsection.intro}</RichText>

            <Scripture scripture={subsection.scripture} />

            <RichText>{subsection.body}</RichText>

            {subsection.questionRepeater.map((question) => (
              <Question question={question} key={question.uniqueKey} />
            ))}
          </React.Fragment>
        ))}
      </>
    </>
  );
};
