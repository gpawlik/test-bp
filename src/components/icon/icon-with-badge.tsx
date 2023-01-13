import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors, fontSizes, spacers } from "~/styles/theme";
import { pxToNumber } from "~/utils/theme";
import { IconSizes } from ".";

interface IconWithBadgeProps {
  badgeText?: string;
  onPress?(): void;
  name: string;
  size?: IconSizes;
  color: string;
}

const BadgeContainer = styled.View`
  height: ${spacers.ss6};
  width: ${spacers.ss6};
  background-color: ${colors.red600};
  border-radius: ${pxToNumber(spacers.ss6) / 2}px;
  position: absolute;
  top: -${spacers.ss4};
  right: -${spacers.ss4};
  z-index: 1;
  justify-content: center;
`;

const Badge = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.fs0};
  text-align: center;
`;

export function IconWithBadge({
  badgeText,
  onPress,
  name,
  ...props
}: IconWithBadgeProps) {
  const Wrapper = onPress ? TouchableOpacity : React.Fragment;

  return (
    <Wrapper onPress={onPress}>
      <BadgeContainer>
        <Badge>{badgeText}</Badge>
      </BadgeContainer>

      <Icon name={name as any} {...props} />
    </Wrapper>
  );
}
