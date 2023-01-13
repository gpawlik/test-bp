import styled from "styled-components/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { css } from "styled-components/native";
import { spacers } from "~/styles/theme";
import { IconSizes } from "~/components/icon";

interface ListItemProgressIconProps {
  isSession: boolean;
}

export const ListItemProgressIcon = styled(Icon).attrs({
  size: IconSizes.Small,
})<ListItemProgressIconProps>`
  ${({ isSession }) =>
    !isSession &&
    css`
      margin: ${spacers.ss7} 0;
    `};
`;
