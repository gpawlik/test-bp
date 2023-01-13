import * as React from "react";
import Toast from "react-native-root-toast";

import { formatMessage } from "~/utils/translation";

import { Container, InviteUrl, CopyButton, CopyText } from "./styles";
import { messages } from "./intl";

interface Props {
  url: string;
}

export const InviteLink = React.memo<Props>(({ url }) => {
  const message = formatMessage(messages.copiedText);

  const onPress = async () => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <Container>
      <InviteUrl selectable>{url}</InviteUrl>
      <CopyButton onPress={onPress}>
        <CopyText>{messages.copyText}</CopyText>
      </CopyButton>
    </Container>
  );
});
