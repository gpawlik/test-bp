import React from "react";
import { GestureResponderEvent, ActivityIndicator } from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import { Icon, IconTypes, IconSizes } from "~/components/icon";
import { colors } from "~/styles/theme";
import { formatMessage, isIntlDescriptor } from "~/utils/translation";

import {
  PressableWrapper,
  Label,
  IconBox,
  LeftIconBox,
  LoadingBox,
  pressedStyle,
} from "./styles";
import { ButtonTypes } from "./types";

export type Props = {
  text: TextType;
  onPress: (e?: GestureResponderEvent) => void;
  onLongPress?: () => void;
  type?: ButtonTypes;
  isDisabled?: boolean;
  isLoading?: boolean;
  stretch?: boolean;
  small?: boolean;
  iconType?: keyof typeof MaterialIcon.glyphMap;
};

export const Button = React.memo<Props>(
  ({
    text,
    onPress,
    onLongPress,
    type = ButtonTypes.Primary,
    iconType,
    isDisabled,
    isLoading,
    stretch,
  }) => {
    const labelText = isIntlDescriptor(text)
      ? formatMessage(text as MessageDescriptorValues)
      : (text as string);
    const mode = type === ButtonTypes.Primary ? "contained" : "text";
    const hasIcon = !!iconType;

    return (
      <PressableWrapper
        type={type}
        disabled={isLoading || !!isDisabled}
        onPress={onPress}
        onLongPress={onLongPress}
        stretch={stretch}
        style={({ pressed }) => [pressed && pressedStyle]}
        hasIcon={hasIcon}
      >
        <Label type={type} disabled={!!isDisabled} hasIcon={hasIcon}>
          {labelText}
        </Label>
        {iconType ? (
          <IconBox>
            <MaterialIcon
              size={IconSizes.Small}
              name={iconType}
              color={colors.white}
            />
          </IconBox>
        ) : null}
        {isLoading ? (
          <LoadingBox>
            <ActivityIndicator />
          </LoadingBox>
        ) : null}
      </PressableWrapper>
    );
  }
);

export const SocialButton = React.memo<Props>(
  ({
    text,
    onPress,
    onLongPress,
    type = ButtonTypes.Google,
    isDisabled,
  }: Props): JSX.Element => {
    const iconType =
      type === ButtonTypes.Google ? IconTypes.LogoGoogle : IconTypes.LogoApple;
    const iconSize = type === ButtonTypes.Google ? 22 : 24;

    return (
      <PressableWrapper
        type={type}
        disabled={!!isDisabled}
        onPress={onPress}
        onLongPress={onLongPress}
        uppercase={false}
        mode="contained"
      >
        <LeftIconBox>
          <Icon type={iconType} size={iconSize} />
        </LeftIconBox>

        <Label type={type} disabled={!!isDisabled}>
          {text}
        </Label>
      </PressableWrapper>
    );
  }
);
