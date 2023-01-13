import * as React from "react";
import { format } from "date-fns";

import { Avatar } from "~/components/avatar";

import {
  Container,
  ImageBox,
  ContentBox,
  ContentWrapper,
  MetaBox,
  MetaText,
} from "./styles";
import { messages } from "./intl";

interface Props {
  isReversed: boolean;
  isFirst: boolean;
  children: React.ReactNode;
  name: string;
  imageUri: string;
  timestamp: number;
}

export const ChatWrapper = React.memo<Props>(
  ({ isReversed, isFirst, name, imageUri, timestamp, children }) => {
    const userName = isReversed ? messages.me : name;
    const metaContent = [
      <MetaText isLast={isReversed} key="time">
        {format(timestamp, "h:mm aaa.")}
      </MetaText>,
      <MetaText isLast={!isReversed} key="username">
        {userName}
      </MetaText>,
    ];

    const content = [
      <ContentBox key="message">
        <ContentWrapper isReversed={isReversed}>
          {isFirst ? (
            <MetaBox>
              {isReversed ? metaContent.reverse() : metaContent}
            </MetaBox>
          ) : null}
          {children}
        </ContentWrapper>
      </ContentBox>,

      <ImageBox isReversed={isReversed} key="image">
        {isFirst ? <Avatar uri={imageUri} size={33} name={name} /> : null}
      </ImageBox>,
    ];

    return (
      <Container isReversed={isReversed}>
        {isReversed ? content.reverse() : content}
      </Container>
    );
  }
);
