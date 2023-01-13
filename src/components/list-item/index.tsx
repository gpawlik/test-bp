import * as React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";

import { GroupAvatar } from "~/components/group-avatar";
import { IconSizes } from "~/components/icon";
import { colors } from "~/styles/theme";

import {
  Container,
  Content,
  Title,
  Description,
  SideBox,
  DescriptionBold,
  RightTextBox,
  RightText,
} from "./styles";

interface Props {
  title: string;
  description: TextType;
  onPress: () => void;
  uri?: string;
  hasAvatar?: boolean;
  isLast?: boolean;
  isHighlighted?: boolean;
  rightText?: TextType;
  numberOfLines?: number;
}

export const ListItem = React.memo<Props>(
  ({
    title,
    description,
    onPress,
    uri,
    hasAvatar,
    isLast,
    isHighlighted,
    numberOfLines,
    rightText,
  }) => {
    const DescriptionComponent = isHighlighted ? DescriptionBold : Description;

    return (
      <Container onPress={onPress} isLast={isLast}>
        {hasAvatar ? (
          <SideBox>
            <GroupAvatar text={title} uri={uri} />
          </SideBox>
        ) : null}
        <Content>
          <Title numberOfLines={numberOfLines}>{title}</Title>

          <DescriptionComponent numberOfLines={2}>
            {description}
          </DescriptionComponent>
        </Content>

        {rightText ? (
          <RightTextBox>
            <RightText>{rightText}</RightText>
          </RightTextBox>
        ) : (
          <Icon
            name="chevron-right"
            size={IconSizes.Medium}
            color={colors.primaryBlue}
          />
        )}
      </Container>
    );
  }
);
