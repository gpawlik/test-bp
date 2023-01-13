import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "~/styles/theme";
import { LoaderContainer } from "./styles";

interface LoaderProps {
  fullScreen?: boolean;
}

export function Loader({ fullScreen }: LoaderProps) {
  if (!fullScreen) return <ActivityIndicator />;

  return (
    <LoaderContainer>
      <ActivityIndicator animating color={colors.primaryBlue} size="large" />
    </LoaderContainer>
  );
}
