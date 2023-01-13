import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import IntroGradientBackground from "<assets>/lottie/intro-gradient-background.json";
import IntroLogo from "<assets>/lottie/intro-logo.json";
import { colors } from "~/styles/theme";

export const SplashBackground = styled(Lottie).attrs({
  autoPlay: true,
  loop: false,
  animationData: IntroGradientBackground,
})`
  background-color: ${colors.white};
  width: 100%;
`;

export const SplashLogo = styled(Lottie).attrs({
  autoPlay: true,
  loop: false,
  animationData: IntroLogo,
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface SplashElementsProps {
  onComplete(): void;
}

export const SplashElements = ({ onComplete }: SplashElementsProps) => {
  return (
    <>
      <SplashBackground />

      <SplashLogo onComplete={onComplete} />
    </>
  );
};
