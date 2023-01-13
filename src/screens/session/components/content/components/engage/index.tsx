import * as React from "react";
import type { EngageSection } from "~/state/flamelink/types";
import { SectionTitle } from "../common";
import { RichText } from "../rich-text";
import { Question } from "../question";

interface EngageProps {
  engage: EngageSection;
}

export const Engage: React.FC<EngageProps> = ({ engage }) => {
  return (
    <>
      <SectionTitle>{engage?.sectionTitle}</SectionTitle>

      {engage?.contentRepeater.map(
        ({ question, uniqueKey, content }, index) => (
          <React.Fragment key={`content-repeater-${index}`}>
            <RichText>{content}</RichText>

            <Question question={{ question, uniqueKey }} />
          </React.Fragment>
        )
      )}
    </>
  );
};
