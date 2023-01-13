import * as React from "react";
import { View, LayoutChangeEvent, Text } from "react-native";
import { Verse as VerseType } from "~/state/bible/types";

import { Container, Title, TextContent, Number, Verse } from "./styles";

interface Props {
  title: string;
  verses: VerseType[];
  scrollToPosition: (position: number) => void;
  highlightedVerses?: string[];
}

interface NumberProps {
  verseToScroll: string;
  scrollToPosition: (position: number) => void;
  text: string;
}

const NumberText = ({ verseToScroll, scrollToPosition, text }: NumberProps) => (
  <View
    onLayout={(event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      if (verseToScroll === text) {
        scrollToPosition(layout.y);
      }
    }}
  >
    <Number>{text}</Number>
  </View>
);

export const Content = React.memo<Props>(
  ({ title, verses, scrollToPosition, highlightedVerses }) => {
    const hasVersesToHighlight = Array.isArray(highlightedVerses);
    const verseToScroll = hasVersesToHighlight ? highlightedVerses[0] : "";

    if (verseToScroll === "1") {
      scrollToPosition(0);
    }

    return (
      <Container>
        {title ? <Title>{title}</Title> : null}
        <TextContent>
          <Text>
            {verses.map(({ verseId, content }) => {
              const id: string = verseId.split(".")[1];
              const lastCharacter = content.charAt(content.length - 1);
              const text = lastCharacter === "\n" ? `${content} \n` : content;
              const isHighlighted =
                hasVersesToHighlight && highlightedVerses.includes(id);

              return [
                <NumberText
                  verseToScroll={verseToScroll}
                  scrollToPosition={scrollToPosition}
                  text={id}
                  key={verseId}
                />,
                <Verse isHighlighted={isHighlighted} key={`text-${verseId}`}>
                  {text}
                </Verse>,
              ];
            })}
          </Text>
        </TextContent>
      </Container>
    );
  }
);
