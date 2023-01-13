import styled from "styled-components/native";
import { colors, spacers, lineHeights } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";
import { Text1, Text2 } from "~/components/text";

export const RESOURCE_HEIGHT = 118;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${spacers.ss6};
  border: 1px solid ${colors.neutral200};
  background-color: ${colors.gray50};
  height: ${RESOURCE_HEIGHT}px;
  margin: ${spacers.ss5} ${spacers.ss8};
`;

const RESOURCE_IMAGE_MARGIN = pxToNumber(spacers.ss6);
const RESOURCE_IMAGE_SIZE = `${RESOURCE_HEIGHT - RESOURCE_IMAGE_MARGIN}px`;

export const Image = styled.Image`
  height: ${RESOURCE_IMAGE_SIZE};
  width: ${RESOURCE_IMAGE_SIZE};
  margin-left: ${spacers.ss4};
  border-radius: ${spacers.ss5};
`;

export const Content = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: ${spacers.ss5} ${spacers.ss6};
`;

export const Title = styled(Text1)`
  letter-spacing: 1px;
  font-family: MontserratBold;
  text-transform: uppercase;
  line-height: ${lineHeights.lh1};
  color: ${colors.gray600};
  font-weight: bold;
`;

export const Description = styled(Text2)`
  margin-top: ${spacers.ss3};
  font-family: SFPro;
  line-height: ${lineHeights.lh2};
`;
