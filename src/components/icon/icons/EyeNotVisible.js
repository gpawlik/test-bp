import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgEyeNotVisible = (props) => (
  <Svg
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m3.527 3.298 11.247 11.247.003-.003.003.003-.908.909-1.443-1.443a8.82 8.82 0 0 1-3.429.69c-3.75 0-6.953-2.333-8.25-5.626a8.915 8.915 0 0 1 2.91-3.833L2.622 4.204l.905-.906Zm2.487.669L7.63 5.583a3.751 3.751 0 0 1 4.861 4.861l2.191 2.191a8.913 8.913 0 0 0 2.568-3.56C15.953 5.783 12.75 3.45 9 3.45a8.832 8.832 0 0 0-2.986.517ZM11.247 9.2a2.247 2.247 0 0 0-2.371-2.371l2.37 2.37Zm-.458 3.171-1.14-1.14a2.247 2.247 0 0 1-2.804-2.804L5.703 7.285a3.751 3.751 0 0 0 5.085 5.085Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgEyeNotVisible;
