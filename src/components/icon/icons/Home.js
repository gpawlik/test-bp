import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgHome = (props) => (
  <Svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 3.275a3.36 3.36 0 0 1 2.24.855l8.002 7.016a3.36 3.36 0 0 1 1.118 2.518v11.67a3.36 3.36 0 0 1-3.36 3.36H8a3.36 3.36 0 0 1-3.36-3.36V13.674a3.36 3.36 0 0 1 1.118-2.53l7.997-7.01.005-.005A3.36 3.36 0 0 1 16 3.275Zm-3.307 24.032h6.614V20a1.973 1.973 0 0 0-1.974-1.973h-2.666A1.974 1.974 0 0 0 12.693 20v7.307Zm8-7.307v7.307H24a1.973 1.973 0 0 0 1.973-1.974V13.666a1.974 1.974 0 0 0-.67-1.48l-8.001-7a1.973 1.973 0 0 0-2.604 0l-8 6.999a1.973 1.973 0 0 0-.671 1.482v11.666A1.973 1.973 0 0 0 8 27.307h3.307V20a3.36 3.36 0 0 1 3.36-3.36h2.666a3.36 3.36 0 0 1 3.36 3.36Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgHome;
