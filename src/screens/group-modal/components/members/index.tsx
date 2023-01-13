import * as React from "react";

import { Avatar } from "~/components/avatar";

import { Container, Item, TextBox, Name, Role } from "./styles";

const members = [
  {
    id: "1",
    name: "Michael Dockery",
    role: "Leader",
    uri: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg",
  },
  {
    id: "2",
    name: "Morgan Sleeve",
    role: "Administrative",
  },
];

export const Members = React.memo(() => {
  return (
    <Container>
      {members.map(({ id, name, role, uri }, index) => (
        <Item key={id} isLast={index === members.length - 1}>
          <Avatar uri={uri} name={name} />
          <TextBox>
            <Name>{name}</Name>
            <Role>{role}</Role>
          </TextBox>
        </Item>
      ))}
    </Container>
  );
});
