import * as React from "react";

import { Container, Bar } from "./styles";

interface Props {
  progress: number;
}

export const ProgressBar = React.memo<Props>(({ progress = 0 }) => {
  const width = Math.min(100, Math.max(0, progress));
  return (
    <Container>
      <Bar width={width} />
    </Container>
  );
});
