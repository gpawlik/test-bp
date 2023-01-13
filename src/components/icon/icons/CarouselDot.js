import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgCarouselDot = (props) => (
  <Svg
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={8.5} cy={8} r={4} fill="url(#carousel-dot_svg__a)" />
    <Defs>
      <LinearGradient
        id="carousel-dot_svg__a"
        x1={5.925}
        y1={4.335}
        x2={9.846}
        y2={12.413}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D4D4D8" />
        <Stop offset={1} stopColor="#D4D4D8" stopOpacity={0.5} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgCarouselDot;
