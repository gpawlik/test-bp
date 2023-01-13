import styled from "styled-components/native";
import { Text3 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";

export const ScriptureContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 ${spacers.ss5};
  background-color: ${colors.indigo50};
`;

export const ScriptureText = styled(Text3)`
  font-family: SFPro;
  padding: ${spacers.ss5};
  color: ${colors.primaryBlue};
  letter-spacing: -${pxToNumber(spacers.ss1) / 3}px;
`;
