import * as React from "react";

import { Container, GradientContainer, Text, AvatarImage } from "./styles";
import { getInitials } from "./utils";
import { AvatarSize } from "./types";

interface Props {
  text: string;
  uri?: string;
  size?: AvatarSize;
}

export const GroupAvatar = React.memo<Props>(
  ({ text = "", uri, size = AvatarSize.Medium }) => {
    return uri ? (
      <Container size={size}>
        <AvatarImage source={{ uri }} size={size} />
      </Container>
    ) : (
      <GradientContainer size={size}>
        <Text size={size}>{getInitials(text)}</Text>
      </GradientContainer>
    );
  }
);
