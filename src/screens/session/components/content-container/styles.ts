import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "~/styles/theme";
import { windowHeight } from "~/utils/platform";

export const WebBottomSheetContainer = styled.ScrollView`
  background-color: ${colors.white};
  height: ${windowHeight};
`;

export const WebBottomSheetChevron = styled(IconButton).attrs({
  color: colors.black,
})`
  width: 100%;
`;
