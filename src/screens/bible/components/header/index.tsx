import * as React from "react";

import { Container, LeftBox, Gradient, TextBox, Intro, Title } from "./styles";

interface Props {
  bookName: string;
}

export const Header = React.memo<Props>(({ bookName }) => {
  return (
    <Container>
      <LeftBox>
        <Gradient colors={["#EC266D", "#EBC12A"]} />
      </LeftBox>
      <TextBox>
        <Intro>The Book of</Intro>
        <Title>{bookName}</Title>
      </TextBox>
    </Container>
  );
});
