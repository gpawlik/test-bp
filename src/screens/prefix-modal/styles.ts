import styled from "styled-components/native";
import { IconButton } from "react-native-paper";

import { IconSizes } from "~/components/icon";
import { Text3 } from "~/components/text";

import { spacers, colors, fontSizes } from "~/styles/theme";

export const Container = styled.View`
  padding-horizontal: ${spacers.ss4};
  padding-top: ${spacers.ss8};
  flex: 1;
`;

export const CloseIcon = styled(IconButton).attrs({
  icon: "close",
  size: IconSizes.Medium,
})`
  margin: 0;
  align-self: flex-end;
`;

export const InputBox = styled.View`
  padding-vertical: ${spacers.ss4};
  padding-horizontal: ${spacers.ss6};
  margin-bottom: ${spacers.ss4};
  background-color: ${colors.white};
  border-radius: ${spacers.ss3};
`;

export const Input = styled.TextInput`
  font-size: ${fontSizes.fs3};
`;

export const Item = styled.TouchableOpacity`
  padding-horizontal: ${spacers.ss4};
  padding-vertical: ${spacers.ss5};
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  flex-direction: row;
`;

export const Prefix = styled(Text3)`
  margin-right: ${spacers.ss2};
  width: 60px;
`;

export const Country = styled(Text3)``;
