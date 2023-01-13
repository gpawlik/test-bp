import styled from "styled-components/native";
import { spacers } from "~/styles/theme";
import { Text5Center } from "../text";

export const GenericErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${spacers.ss11};
`;

export const IconContainer = styled.View`
  align-items: center;
  margin-bottom: ${spacers.ss7};
`;

export const Message = styled(Text5Center)`
  margin-bottom: ${spacers.ss7};
`;
