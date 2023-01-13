import * as React from "react";
import { useNavigation, TabActions } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import NothingStartedImage from "<assets>/resources/nothing-started.png";

import { Container, EmptyImage, Content, Title, Description } from "./styles";
import { messages } from "./intl";

interface Props {
  text?: TextType;
}

export const ResourceEmpty = React.memo<Props>(({ text }) => {
  const navigation = useNavigation();

  const onPress = React.useCallback(() => {
    navigation.dispatch(TabActions.jumpTo(routes.libraryTab));
  }, [navigation]);

  return (
    <Container onPress={onPress}>
      <EmptyImage source={NothingStartedImage} />

      <Content>
        <Title>{messages.title}</Title>
        <Description>{text || messages.description}</Description>
      </Content>
    </Container>
  );
});
