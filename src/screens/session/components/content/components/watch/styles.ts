import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { colors } from "~/styles/theme";
import { hexToRGB } from "~/utils/colors";
import { isWeb, windowWidth } from "~/utils/platform";

export const VideoContainer = styled.View`
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const mobileAspectRatio = windowWidth * (9 / 16);

export const VideoMask = styled.View`
  ${StyleSheet.absoluteFill};
  width: 100%;
  height: ${mobileAspectRatio}px;
  background-color: ${hexToRGB(colors.black, 0.6)};
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const videoStyles = StyleSheet.create({
  video: {
    width: "100%",
    ...(isWeb ? { maxHeight: 500 } : { height: mobileAspectRatio }),
  },
}).video;
