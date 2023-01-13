import styled from "styled-components/native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { Text2, Text4 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

type Props = {
  isActive: boolean;
  isChecked?: boolean;
  isShown?: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${spacers.ss4};
`;

export const Content = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const StepLineBox = styled.View`
  height: 40px;
  justify-content: center;
  flex: 1;
`;

export const StepLine = styled.View<Props>`
  height: 2px;
  background-color: ${({ isActive, isShown }) =>
    !isShown
      ? colors.transparent
      : isActive
      ? colors.emerald600
      : colors.gray400};
  width: 100%;
`;

export const StepBox = styled.View`
  align-items: center;
`;

export const StepCircle = styled.View<Props>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${({ isActive }) =>
    isActive ? colors.emerald600 : colors.gray400};
  background-color: ${({ isActive, isChecked }) =>
    isActive || isChecked ? colors.emerald600 : "transparent"};
  align-items: center;
  justify-content: center;
`;

export const StepIcon = styled(Icon).attrs(
  ({ isActive, isChecked }: Props) => ({
    color:
      isActive && !isChecked
        ? colors.white
        : isChecked
        ? colors.white
        : colors.gray400,
  })
)<Props>``;

export const StepNumber = styled(Text4)<Props>`
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray400)};
  font-family: SFProDisplayMedium;
`;
