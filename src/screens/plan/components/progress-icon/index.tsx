import * as React from "react";
import { ProgressState } from "~/state/content-progress";
import { colors } from "~/styles/theme";
import { ListItemProgressIcon } from "./styles";

interface ProgressIconProps {
  state?: ProgressState;
  isSession: boolean;
}

export const ProgressIcon: React.FC<ProgressIconProps> = React.memo(
  ({ state, isSession }) => {
    if (state === ProgressState.InProgress)
      return (
        <ListItemProgressIcon
          name="progress-check"
          color={colors.black}
          isSession={isSession}
        />
      );

    if (state === ProgressState.Completed)
      return (
        <ListItemProgressIcon
          name="check-circle"
          color={colors.green600}
          isSession={isSession}
        />
      );

    return null;
  }
);
