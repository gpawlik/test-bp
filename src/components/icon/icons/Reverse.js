import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgReverse = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="reverse_svg__feather reverse_svg__feather-refresh-cw"
    {...props}
  >
    <Path d="M23 4v6h-6M1 20v-6h6" />
    <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Svg>
);

export default SvgReverse;
