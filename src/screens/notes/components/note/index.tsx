import * as React from "react";

import { Container, Title, Description } from "./styles";
import { messages } from "./intl";

interface Props {
  title: TextType;
  count: number;
  onPress: () => void;
  isLoading?: boolean;
}

export const Note = ({ title, count, onPress, isLoading }: Props) => {
  const message = isLoading
    ? messages.loading
    : { ...messages.summary, values: { count } };
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Description>{message}</Description>
    </Container>
  );
};
