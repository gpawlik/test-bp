import React from "react";
import { colors } from "~/styles/theme";
import { IconSizes, IconTypes } from "../icon";
import { CarouselContainer, CarouselDot } from "./styles";

interface CarouselDotsProps {
  size?: number;
  activeIndex: number;
}

export function CarouselDots({ size = 1, activeIndex }: CarouselDotsProps) {
  return (
    <CarouselContainer>
      {new Array(size).fill(0).map((_, index) => (
        <CarouselDot
          type={
            index === activeIndex
              ? IconTypes.ActiveCarouselDot
              : IconTypes.CarouselDot
          }
          size={IconSizes.SMedium}
          key={`carousel-dot-${index}`}
        />
      ))}
    </CarouselContainer>
  );
}
