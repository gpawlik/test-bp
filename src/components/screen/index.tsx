import React from "react";

import { colors, Colors } from "~/styles/theme";

import { SafeAreaContainer } from "./styles";

export type Props = {
  children: React.ReactNode;
  backgroundColor?: Colors;
};

export const Screen = React.memo<Props>(
  ({ children, backgroundColor = colors.white }) => {
    return (
      <SafeAreaContainer backgroundColor={backgroundColor}>
        {children as JSX.Element}
      </SafeAreaContainer>
    );
  }
);
