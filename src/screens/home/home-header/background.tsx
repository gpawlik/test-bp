// @ts-nocheck
// Disabling checks because of incompatibility of react-native-svg/react 18 and expo versions
import React from "react";
import {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  SvgProps,
} from "react-native-svg";
import { Background } from "./styles";
import { getBackgroundColors } from "~/utils/theme";
import { Clouds } from "./clouds";

export const HeaderBackground = React.memo((props: SvgProps) => {
  const backgroundColors = getBackgroundColors();

  return (
    <>
      <Background
        viewBox="0 1 375 358"
        fill="none"
        preserveAspectRatio="none"
        {...props}
      >
        <G clipPath="url(#header-day_svg__clip0_236_10528)">
          <Path
            opacity={0.4}
            d="M375-7.517H0v296.229s85-11.062 190 12.363c105 23.424 185 0 185 0V-7.517Z"
            fill="url(#header-day_svg__a)"
          />
          <Path
            opacity={0.3}
            d="M375-6.699H0v251.924s80 52.596 185 76.021c105 23.425 190-47.332 190-47.332V-6.699Z"
            fill="url(#header-day_svg__b)"
          />
          <G opacity={0.5}>
            <Path
              d="M0-8h375v331.198s-79-31.883-187.5-31.883S0 267.03 0 267.03V-8Z"
              fill="url(#header-day_svg__c)"
            />
            <Path
              d="M0-8h375v331.198s-79-31.883-187.5-31.883S0 267.03 0 267.03V-8Z"
              fill="url(#header-day_svg__d)"
              fillOpacity={0.4}
            />
          </G>
        </G>
        <Defs>
          <LinearGradient
            id="header-day_svg__a"
            x1={187.5}
            y1={-7.517}
            x2={187.5}
            y2={311.486}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={backgroundColors[0].start} />
            <Stop offset={1} stopColor={backgroundColors[0].end} />
          </LinearGradient>
          <LinearGradient
            id="header-day_svg__b"
            x1={324}
            y1={58}
            x2={172.5}
            y2={311.5}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={backgroundColors[1].start} />
            <Stop offset={1} stopColor={backgroundColors[1].end} />
          </LinearGradient>
          <LinearGradient
            id="header-day_svg__d"
            x1={216}
            y1={323.71}
            x2={216}
            y2={109.861}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
          <RadialGradient
            id="header-day_svg__c"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(334.0003 -203.50037 230.41352 378.1722 41 250.5)"
          >
            <Stop stopColor={backgroundColors[2].start} />
            <Stop offset={1} stopColor={backgroundColors[2].end} />
          </RadialGradient>
        </Defs>
      </Background>

      <Clouds />
    </>
  );
});
