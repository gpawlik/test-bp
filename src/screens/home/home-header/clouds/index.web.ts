import styled from "styled-components";
import LottieView from "lottie-react";
import WhiteWaves from "<assets>/lottie/white-waves.json";

export const Clouds = styled(LottieView).attrs({
  animationData: WhiteWaves,
  resizeMode: "cover",
  rendererSettings: {
    preserveAspectRatio: "none",
  },
})`
  top: -250px;
  position: absolute;
  height: 1000px;
  width: 100%;
`;
