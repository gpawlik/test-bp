import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const SvgEyeOpen = (props) => (
  <Svg
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#eye-open_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.75 8.7C2.047 5.408 5.25 3.075 9 3.075s6.953 2.333 8.25 5.625c-1.297 3.293-4.5 5.625-8.25 5.625S2.047 11.993.75 8.7Zm14.865 0A7.328 7.328 0 0 0 9 4.575 7.328 7.328 0 0 0 2.385 8.7 7.328 7.328 0 0 0 9 12.825 7.328 7.328 0 0 0 15.615 8.7ZM9 6.825a1.876 1.876 0 1 1-.001 3.752A1.876 1.876 0 0 1 9 6.825ZM5.625 8.7A3.38 3.38 0 0 1 9 5.325 3.38 3.38 0 0 1 12.375 8.7 3.38 3.38 0 0 1 9 12.075 3.38 3.38 0 0 1 5.625 8.7Z"
        fill="currentColor"
      />
    </G>
    <Defs>
      <ClipPath id="eye-open_svg__a">
        <Path fill="#fff" transform="translate(0 .075)" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgEyeOpen;
