import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgArrowDown = (props) => (
  <Svg
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m5.56 8.602 2.705 2.538a1.09 1.09 0 0 0 1.473 0l2.705-2.538c.658-.617.188-1.675-.742-1.675h-5.41c-.93 0-1.39 1.058-.731 1.675Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgArrowDown;
