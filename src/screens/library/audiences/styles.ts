import styled from "styled-components/native";
import { Text4 } from "~/components/text";
import { spacers } from "~/styles/theme";
import { isPad, isWeb } from "~/utils/platform";
import { pxToNumber } from "~/utils/theme";

export const planSize = (() => {
  const BASE_SIZE = 160;

  if (isWeb || isPad) {
    return `${BASE_SIZE * 2}px`;
  }

  return `${BASE_SIZE}px`;
})();

export const AudienceContainer = styled.View`
  margin-top: -${spacers.ss6};
`;

export const AudienceTitle = styled(Text4)`
  text-transform: capitalize;
  font-family: SFProDisplay;
  margin: ${spacers.ss6} ${spacers.ss6} 0;
`;

export const PlansContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
  padding: ${spacers.ss6} ${spacers.ss6} ${pxToNumber(planSize) / 8}px
    ${spacers.ss6};
`;
