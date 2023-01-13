import styled from "styled-components";
import Lottie from "lottie-react";
import { BubbleProps } from "../../types";
import { bubbleBackgroundStyles } from "./styles";
import { getBubbleByType } from "./utils";

export const BubbleBackground = styled(Lottie).attrs(
  ({ bubbleType }: BubbleProps) => ({
    animationData: getBubbleByType(bubbleType),
    autoplay: false,
  })
)<BubbleProps>`
  ${bubbleBackgroundStyles}
`;
