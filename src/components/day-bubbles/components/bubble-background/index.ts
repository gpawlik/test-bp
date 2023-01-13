import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { BubbleProps } from "../../types";
import { bubbleBackgroundStyles } from "./styles";
import { getBubbleByType } from "./utils";

export const BubbleBackground = styled(LottieView).attrs(
  ({ bubbleType }: BubbleProps) => ({
    source: getBubbleByType(bubbleType),
    autoPlay: false,
    speed: 0.5,
  })
)<BubbleProps>`
  ${bubbleBackgroundStyles}
`;
