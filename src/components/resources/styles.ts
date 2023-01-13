import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { spacers, lineHeights } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";
import { Text3 } from "~/components/text";

export const RESOURCE_HEIGHT = 118;

export const ResourcesContainer = styled.View`
  padding-top: ${spacers.ss12};
`;

export const ResourcesTopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacers.ss4};
  margin: 0 ${spacers.ss8};
`;

export const ResourcesTopBarTitle = styled(Text3)`
  font-family: Montserrat;
  line-height: ${lineHeights.lh1};
`;

export const carouselStyles = StyleSheet.create({
  carousel: {
    width: "100%",
    marginTop: pxToNumber(spacers.ss2),
    justifyContent: "center",
  },
}).carousel;
