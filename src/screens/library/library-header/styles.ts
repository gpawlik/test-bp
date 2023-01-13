import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import { IconSizes } from "~/components/icon";
import { Text8 } from "~/components/text";
import { lineHeights, spacers } from "~/styles/theme";

export const LibraryHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${spacers.ss6} ${spacers.ss3};
`;

export const LibraryHeaderTitle = styled(Text8)`
  font-family: Montserrat;
  line-height: ${lineHeights.lh6};
`;

export const SearchIcon = styled(IconButton).attrs({
  icon: "magnify",
  size: IconSizes.Large,
})`
  margin: 0;
`;
