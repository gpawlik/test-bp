import styled from "styled-components/native";
import { Platform } from "react-native";

import { Icon } from "~/components/icon";
import { Text3 } from "~/components/text";
import { spacers, colors, lineHeights } from "~/styles/theme";

type Props = {
  isActive: boolean;
  isLast?: boolean;
};

export const KeyboardAvoiding = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : "height",
  keyboardVerticalOffset: 100,
})`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})``;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonBox = styled.View<{ isLast?: boolean }>`
  padding-top: ${spacers.ss10};
  margin-right: ${({ isLast }) => (isLast ? spacers.ss0 : spacers.ss4)};
  flex: 1;
`;

export const TypeContainer = styled.View`
  flex-direction: row;
  margin-vertical: ${spacers.ss8};
`;

export const TypeBox = styled.TouchableOpacity<Props>`
  background-color: rgba(255, 255, 255, 0.4);
  align-items: center;
  justify-content: center;
  min-height: 140px;
  border-radius: ${spacers.ss4};
  margin-right: ${({ isLast }) => (isLast ? spacers.ss0 : spacers.ss4)};
  border-color: ${({ isActive }) =>
    isActive ? colors.red700 : colors.transparent};
  border-width: 2px;
  flex: 1;
`;

export const TypeIcon = styled(Icon).attrs(({ isActive }: Props) => ({
  color: isActive ? colors.red700 : colors.gray500,
  size: 36,
}))<Props>``;

export const TypeText = styled(Text3)<Props>`
  margin-top: ${spacers.ss4};
  color: ${({ isActive }) => (isActive ? colors.red700 : colors.gray500)};
`;

export const DescriptionContainer = styled.View`
  margin-bottom: ${spacers.ss8};
`;

export const Description = styled(Text3)`
  margin-bottom: ${spacers.ss4};
  color: ${colors.gray800};
  line-height: ${lineHeights.lh3};
`;
