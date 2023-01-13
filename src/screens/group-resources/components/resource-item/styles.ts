import styled, { css } from "styled-components/native";

import { Text1, Text2 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";
import { isWeb } from "~/utils/platform";

const imageStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
`;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${spacers.ss4};
  border-width: 1px;
  border-color: ${colors.gray300};
  border-radius: 16px;
  background-color: ${colors.gray50};
`;

export const Content = styled.View`
  margin: ${spacers.ss5} ${spacers.ss3};
  padding-left: ${spacers.ss5};
  flex: 1;
  ${isWeb &&
  css`
    min-height: 85%;
  `}
`;

export const ResourceImage = styled.Image`
  ${imageStyle}
`;

export const EmptyImage = styled.View`
  background-color: ${colors.gray100};
  ${imageStyle};
`;

export const Category = styled(Text2)`
  font-family: MontserratBold;
  font-size: 13px;
  margin-bottom: ${spacers.ss3};
  color: ${colors.gray600};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Title = styled(Text2)`
  font-family: MontserratMedium;
  color: ${colors.black};
`;

export const TextBox = styled.View`
  flex: 1;
`;

export const ProgressBox = styled.View``;

export const Progress = styled(Text1)`
  font-family: MontserratMedium;
  color: ${colors.gray600};
  margin-top: ${spacers.ss3};
`;
