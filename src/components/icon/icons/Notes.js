import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgNotes = (props) => (
  <Svg
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 3.49a.65.65 0 0 1 .65-.65H23.721a3.65 3.65 0 0 1 3.65 3.65v18.692a3.65 3.65 0 0 1-3.65 3.65H6.15a.65.65 0 0 1-.65-.65V3.49Zm7.714.65H9.371v4.217l1.652-.755a.65.65 0 0 1 .54 0l1.651.755V4.14Zm-5.143 0v5.23a.65.65 0 0 0 .92.59l2.302-1.052 2.3 1.052a.65.65 0 0 0 .921-.59V4.14h7.064v23.392H6.8V4.14h1.271Zm15.65 23.392h-.843V4.14h.843a2.35 2.35 0 0 1 2.35 2.35v18.692a2.35 2.35 0 0 1-2.35 2.35Z"
      fill="currentColor"
    />
  </Svg>
);

export default SvgNotes;
