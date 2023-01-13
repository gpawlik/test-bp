import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgUser = (props) => (
  <Svg
    style={{
      width: 24,
      height: 24,
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
    />
  </Svg>
);

export default SvgUser;
