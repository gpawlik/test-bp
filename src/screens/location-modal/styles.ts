import styled from "styled-components/native";
import { IconButton } from "react-native-paper";

import { IconSizes } from "~/components/icon";

import { spacers } from "~/styles/theme";

export const Container = styled.View`
  padding-horizontal: ${spacers.ss4};
  flex: 1;
`;

export const CloseIcon = styled(IconButton).attrs({
  icon: "close",
  size: IconSizes.Medium,
})`
  margin: 0;
  align-self: flex-end;
`;
