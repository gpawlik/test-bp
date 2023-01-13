import * as React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Container, Content } from "./styles";
import { colors } from "~/styles/theme";

interface Props {
  onPress: () => void;
}

export const Fab = React.memo<Props>(({ onPress }) => {
  return (
    <Container onPress={onPress}>
      <Content>
        <Icon name="square-edit-outline" size={30} color={colors.white} />
      </Content>
    </Container>
  );
});
