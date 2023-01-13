import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "~/styles/theme";
import { messages } from "../../intl";
import {
  ButtonText,
  ResumeButtonContainer,
  ResumeButtonGroup,
  ResumeButtonProgress,
  ResumeButtonTextContainer,
  StartButton,
} from "./styles";
import { IconSizes } from "~/components/icon";

interface PlanMainButtonProps {
  onPress(): void;
  type: "start" | "resume";
}

export const PlanMainButton: React.FC<PlanMainButtonProps> = React.memo(
  ({ onPress, type }) => {
    if (type === "resume") {
      return (
        <ResumeButtonContainer onPress={onPress}>
          <ResumeButtonProgress>
            <MaterialCommunityIcons
              name="progress-check"
              size={IconSizes.Medium}
              color={colors.white}
            />
          </ResumeButtonProgress>

          <ResumeButtonTextContainer>
            <ButtonText>{messages.resumeButton}</ButtonText>
          </ResumeButtonTextContainer>

          <ResumeButtonGroup>
            <MaterialIcons
              name="group-add"
              size={IconSizes.Medium}
              color={colors.white}
            />
          </ResumeButtonGroup>
        </ResumeButtonContainer>
      );
    }

    return (
      <StartButton onPress={onPress}>
        <ButtonText>{messages.startButton}</ButtonText>
      </StartButton>
    );
  }
);
