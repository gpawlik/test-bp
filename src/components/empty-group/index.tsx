import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { GroupsProps } from "~/navigation/groups-stack";
import { Button } from "~/components/button";

import { EmptyGroupImage } from "./group-image";
import { Container, Content, Title, Description } from "./styles";
import { messages } from "./intl";

export const EmptyGroup = React.memo(() => {
  const navigation = useNavigation<GroupsProps["navigation"]>();

  const handleCreate = React.useCallback(
    () => navigation.navigate(routes.groupModal),
    [navigation]
  );

  return (
    <Container>
      <Content>
        <EmptyGroupImage />

        <Title>{messages.title}</Title>

        <Description>{messages.description}</Description>
      </Content>

      <Button text={messages.button} onPress={handleCreate} iconType="add" />
    </Container>
  );
});
