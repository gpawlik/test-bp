import Svg from "react-native-svg";
import styled from "styled-components/native";
import { isWeb } from "~/utils/platform";

export const HeaderContainer = styled.View`
  flex-direction: column;
`;

export const Background = styled(Svg)`
  position: absolute;
  width: 100%;
  height: ${isWeb ? 350 : 400}px;
`;
