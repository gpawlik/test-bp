import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "~/styles/theme";

export const SafeAreaContainer = styled(SafeAreaView)<{
  backgroundColor: Colors;
}>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  width: 100%;
`;
