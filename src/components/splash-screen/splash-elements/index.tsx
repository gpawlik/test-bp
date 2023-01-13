import React from "react";
import Lottie from "lottie-react-native";
import styled from "styled-components/native";
import IntroGradientBackground from "<assets>/lottie/intro-gradient-background.json";
import IntroLogo from "<assets>/lottie/intro-logo.json";
import { colors } from "~/styles/theme";

export const SplashBackground = styled(Lottie).attrs({
  autoPlay: true,
  loop: false,
  source: IntroGradientBackground,
  resizeMode: "cover",
})`
  background-color: ${colors.white};
  width: 100%;
`;

interface SplashElementsProps {
  onComplete(): void;
}

const SplashLogo = styled(Lottie).attrs(
  ({ onComplete }: SplashElementsProps) => ({
    autoPlay: true,
    loop: false,
    source: IntroLogo,
    onAnimationFinish: onComplete,
  })
)<SplashElementsProps>`
  background-color: transparent;
  position: absolute;
  z-index: 1;
`;

export function SplashElements({ onComplete }: SplashElementsProps) {
  const splashBackgroundRef = React.useRef<Lottie | null>(null);
  const splashLogoRef = React.useRef<Lottie | null>(null);

  // For some devices, the autoplay on the lotties is not working
  // which causes the splash screen getting stuck
  // See: https://github.com/lottie-react-native/lottie-react-native/issues/832
  React.useEffect(() => {
    if (splashBackgroundRef.current && splashLogoRef.current) {
      const startAnimationsTimeout = setTimeout(() => {
        splashBackgroundRef.current?.reset();
        splashLogoRef.current?.reset();

        splashBackgroundRef.current?.play();
        splashLogoRef.current?.play();
      }, 100);

      return () => clearTimeout(startAnimationsTimeout);
    }
  }, []);

  return (
    <>
      <SplashBackground ref={splashBackgroundRef} />

      <SplashLogo onComplete={onComplete} ref={splashLogoRef} />
    </>
  );
}
