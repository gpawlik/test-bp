import * as React from "react";
import { Avatar as RNPaperAvatar } from "react-native-paper";

import { IconBox, Text } from "./styles";

interface Props {
  uri?: string;
  size?: number;
  name?: string;
}

export const Avatar = React.memo<Props>(({ uri, size = 32, name = "" }) => {
  return uri ? (
    <RNPaperAvatar.Image size={size} source={{ uri }} />
  ) : (
    <IconBox size={size}>
      <Text>{name.charAt(0)}</Text>
    </IconBox>
  );
});
