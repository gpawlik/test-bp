import * as React from "react";
import {
  BackgroundBlurView,
  BackgroundLinearGradient,
  BackgroundImage,
} from "./styles";

interface BackgroundGradientProps {
  source: {
    uri: string;
  };
  colors?: string[];
  imageWidth?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  source,
  colors,
  imageWidth,
}) => {
  return (
    <>
      <BackgroundImage source={source} imageWidth={imageWidth} />

      <BackgroundLinearGradient colors={colors} />

      <BackgroundBlurView />
    </>
  );
};
