import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgClose = props => (
    <Svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M24 1 1 24M1 1l23 23"
            strokeWidth={props.strokeWidth || 2}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default SvgClose;
