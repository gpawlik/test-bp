import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const SvgActiveCarouselDot = (props) => (
  <Svg
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={8.5} cy={8} r={4} fill="url(#active-carousel-dot_svg__a)" />
    <Circle cx={8.5} cy={8} r={7.5} stroke="url(#active-carousel-dot_svg__b)" />
    <Defs>
      <LinearGradient
        id="active-carousel-dot_svg__a"
        x1={5.925}
        y1={4.335}
        x2={9.846}
        y2={12.413}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#C283CC" />
        <Stop offset={1} stopColor="#F4D1D3" />
      </LinearGradient>
      <LinearGradient
        id="active-carousel-dot_svg__b"
        x1={3.349}
        y1={0.67}
        x2={11.191}
        y2={16.827}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#C283CC" />
        <Stop offset={1} stopColor="#F4D1D3" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgActiveCarouselDot;
