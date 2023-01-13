import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import WhiteWaves from "<assets>/lottie/white-waves.json";

export const Clouds = styled(LottieView).attrs({
  source: WhiteWaves,
  autoPlay: true,
  loop: true,
  resizeMode: "cover",
})`
  top: 90px;
  height: 100px;
  width: 100%;
  position: absolute;
`;
