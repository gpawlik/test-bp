import { StyleSheet } from "react-native";
import { colors, fontSizes, lineHeights, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";

export const markdownStyles = StyleSheet.create({
  body: {
    fontSize: pxToNumber(fontSizes.fs3),
    marginHorizontal: pxToNumber(spacers.ss5),
    lineHeight: pxToNumber(lineHeights.lh5) - 2,
  },
  link: {
    color: colors.primaryBlue,
    textDecorationLine: "none",
  },
  heading3: {
    fontSize: pxToNumber(fontSizes.fs6),
    paddingTop: pxToNumber(spacers.ss4),
  },
});
