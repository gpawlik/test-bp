import styled from "styled-components/native";

import Icon from "@expo/vector-icons/MaterialIcons";

import { spacers, colors } from "~/styles/theme";

export const Content = styled.View`
  margin-top: ${spacers.ss4};
  align-items: center;
`;

export const ImageBox = styled.TouchableOpacity`
  width: 250px;
  height: 250px;
  border-radius: 125px;
  background-color: ${colors.gray50};
  padding-vertical: ${spacers.ss6};
  margin-bottom: ${spacers.ss8};
  margin-top: ${spacers.ss6};
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const ImagePreview = styled.Image`
  width: 250px;
  height: 250px;
`;

export const ImageIcon = styled(Icon).attrs({
  name: "image",
  size: 130,
  color: colors.gray100,
})``;
