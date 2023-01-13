import { Platform } from "react-native";
import styled from "styled-components/native";

import { Text1 } from "~/components/text";
import { colors, spacers } from "~/styles/theme";

export const Container = styled.View`
  flex-direction: row;
  padding-vertical: ${spacers.ss5};
  padding-top: ${Platform.select({
    ios: spacers.ss10,
    android: spacers.ss9,
    default: spacers.ss7,
  })};
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
`;

export const SideBox = styled.View`
  width: 46px;
`;

export const IconBox = styled.View`
  width: 24px;
`;

export const CenterBox = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

export const GroupText = styled(Text1)`
  font-family: SFProDisplayMedium;
  margin-top: ${spacers.ss3};
`;
