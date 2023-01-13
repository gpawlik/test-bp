import * as React from "react";

import { Container, ButtonBox, ButtonText, TitleBox, Title } from "./styles";
import { messages } from "./intl";

interface Props {
  title?: TextType;
  onRightPress: () => void;
  onLeftPress: () => void;
  hasSeparator?: boolean;
}

export const ModalHeader = React.memo<Props>(
  ({ title, onRightPress, onLeftPress, hasSeparator }) => {
    return (
      <Container hasSeparator={hasSeparator}>
        <ButtonBox onPress={onLeftPress}>
          <ButtonText>{messages.cancel}</ButtonText>
        </ButtonBox>

        {title ? (
          <TitleBox>
            <Title>{title}</Title>
          </TitleBox>
        ) : null}

        <ButtonBox onPress={onRightPress}>
          <ButtonText isHighlighted>{messages.done}</ButtonText>
        </ButtonBox>
      </Container>
    );
  }
);
