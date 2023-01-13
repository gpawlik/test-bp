import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { IconSizes } from "~/components/icon";
import { colors, spacers } from "~/styles/theme";
import { isWeb } from "~/utils/platform";
import { pxToNumber } from "~/utils/theme";

export const Footer = styled.View<{ hasExtraSpace?: boolean }>`
  width: 100%;
  padding: ${spacers.ss5};
  padding-bottom: ${({ hasExtraSpace }) =>
    hasExtraSpace ? spacers.ss9 : spacers.ss8};
`;

export const NavigationButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NavigationButton = styled(Button)`
  flex: 1;
  border-radius: 42px;
  padding: ${spacers.ss3} 0;
`;

export const BackButton = styled(NavigationButton).attrs({
  mode: "outlined",
  icon: "chevron-left",
  labelStyle: {
    fontSize: IconSizes.Medium,
    color: colors.gray700,
    marginTop: isWeb ? pxToNumber(spacers.ss3) : undefined,
  },
})`
  border-color: ${colors.gray700};
  border-width: 1px;
  margin-right: ${spacers.ss4};
`;

export const ContinueButton = styled(NavigationButton).attrs({
  icon: "chevron-right",
  mode: "contained",
  color: colors.gray700,
  labelStyle: {
    fontSize: IconSizes.Medium,
    marginTop: isWeb ? pxToNumber(spacers.ss3) : undefined,
  },
  contentStyle: { flexDirection: "row-reverse" },
})`
  margin-left: ${spacers.ss4};
`;

type CompleteButtonProps = {
  isFinishButton: boolean;
};

export const CompleteButton = styled(NavigationButton).attrs({
  icon: "check",
  mode: "contained",
  color: colors.green600,
  labelStyle: {
    fontSize: IconSizes.Medium,
    marginTop: isWeb ? pxToNumber(spacers.ss3) : undefined,
  },
  contentStyle: { flexDirection: "row-reverse" },
})<CompleteButtonProps>`
  margin-left: ${({ isFinishButton }) => (isFinishButton ? spacers.ss4 : 0)};
`;
