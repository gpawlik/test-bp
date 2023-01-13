import * as React from "react";
import type { ReflectSection } from "~/state/flamelink/types";
import { RichText } from "../rich-text";
import { SectionTitle } from "../common";

interface ReflectProps {
  reflect: ReflectSection;
}

export const Reflect: React.FC<ReflectProps> = ({ reflect }) => {
  return (
    <>
      <SectionTitle>{reflect?.sectionTitle}</SectionTitle>

      <RichText>{reflect?.content}</RichText>
    </>
  );
};
