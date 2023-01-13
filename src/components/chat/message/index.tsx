import * as React from "react";

import { ChatWrapper } from "../wrapper";

import { Content, Text } from "./styles";

interface Props {
  isReversed: boolean;
  isFirst: boolean;
  text: string;
  timestamp: number;
  name: string;
  imageUri: string;
}

export const ChatMessage = React.memo<Props>(
  ({ isReversed, isFirst, text, name, imageUri, timestamp }) => {
    return (
      <ChatWrapper
        isReversed={isReversed}
        isFirst={isFirst}
        name={name}
        imageUri={imageUri}
        timestamp={timestamp}
      >
        <Content isReversed={isReversed}>
          <Text isReversed={isReversed}>{text}</Text>
        </Content>
      </ChatWrapper>
    );
  }
);
