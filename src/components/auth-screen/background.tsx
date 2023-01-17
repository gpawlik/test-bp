import React from "react";
import { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";
import { BackgroundContainer } from "./styles";

export const SvgBackground = (props: SvgProps) => {
  const { id, ...rest } = props;

  return (
    <BackgroundContainer
      viewBox="0 1 375 560"
      preserveAspectRatio="none"
      fill="none"
      {...rest}
    >
      <Path
        opacity=".2"
        d="M375 0H0v542.824s40-6.935 146.5 12.04C253 573.838 375 523.017 375 523.017V0Z"
        fill="#fff"
      />
      <Path
        opacity=".2"
        d="M375 0H0v555.911s79-19.892 190-3.665 185-13.61 185-13.61V0Z"
        fill={`url(#a${id})`}
      />
      <Path
        d="M0 .536h375v544.5H187.5C79 545.036 0 518.048 0 518.048V.536Z"
        fill={`url(#b${id})`}
      />
      <Defs>
        {/* @ts-ignore */}
        <LinearGradient
          id={`a${id}`}
          x1={167}
          y1={571.696}
          x2={139.955}
          y2={432.653}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset="1" stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        {/* @ts-ignore */}
        <LinearGradient
          id={`b${id}`}
          x1={187.5}
          y1={0.536}
          x2={187.5}
          y2={545.036}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset="1" stopColor="#fff" stopOpacity={0.5} />
        </LinearGradient>
      </Defs>
    </BackgroundContainer>
  );
};
