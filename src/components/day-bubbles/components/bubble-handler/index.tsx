import * as React from "react";
import type { ViewProps } from "react-native";
import Lottie from "lottie-react-native";
import type { LottieRefCurrentProps } from "lottie-react";
import type { BubbleProps } from "../../types";
import { BubbleBackground } from "../bubble-background/index";
import { isWeb } from "~/utils/platform";

interface BubbleHandlerProps extends BubbleProps, ViewProps {
  animationRandomStartTime: number;
}

export const BubbleHandler = ({
  animationRandomStartTime,
  ...props
}: BubbleHandlerProps) => {
  const animationRef = React.useRef<Lottie | LottieRefCurrentProps>(null);

  React.useEffect(() => {
    const staggerAnimationTimeout = setTimeout(() => {
      if (isWeb) {
        (animationRef.current as LottieRefCurrentProps)?.goToAndPlay(1);
        (animationRef.current as LottieRefCurrentProps)?.setSpeed(0.5);

        return;
      }

      animationRef.current?.play();
    }, animationRandomStartTime);

    return () => clearTimeout(staggerAnimationTimeout);
  }, [animationRandomStartTime]);

  return (
    <BubbleBackground
      ref={animationRef as React.RefObject<Lottie>}
      {...(isWeb
        ? { lottieRef: animationRef as React.RefObject<LottieRefCurrentProps> }
        : {})}
      {...props}
    />
  );
};
