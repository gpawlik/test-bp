import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "@expo/vector-icons/MaterialIcons";

import * as routes from "~/constants/routes";
import { PostAuthParamList } from "~/navigation/post-auth";
import { IconWithBadge } from "~/components/icon/icon-with-badge";
import { getProfileImage } from "~/state/user/selectors";
import { IconSizes } from "~/components/icon";
import { BackButton } from "~/components/back-button";
import { useAppDispatch, useAppSelector } from "~/state/hooks";
import { logout } from "~/state/user/slice";
import { getElementColorBasedOnDayTime } from "~/utils/theme";
import { formatMessage } from "~/utils/translation";
import { colors } from "~/styles/theme";

import {
  HeaderAvatar,
  AvatarImage,
  HeaderAvatarPlaceholderBackground,
  HeaderBarBackButtonContainer,
  HeaderBarContainer,
  HeaderIconsContainer,
  HeaderIconWrapper,
} from "./styles";
import { messages } from "./intl";

interface HeaderBarProps {
  iconColor?: string;
  backButtonText?: MessageDescriptor;
  withBackButton?: boolean;
  withChatButton?: boolean;
  withCastButton?: boolean;
  withLightButtons?: boolean;
}

const HEADER_BAR_TOP_OFFSET = 20;

type NavigationProp = NativeStackScreenProps<PostAuthParamList, "messages">;

export function HeaderBar({
  iconColor,
  backButtonText,
  withBackButton = true,
  withChatButton = true,
  withCastButton = true,
  withLightButtons = false,
}: HeaderBarProps) {
  const elementColor = getElementColorBasedOnDayTime();
  const profileImage = useAppSelector(getProfileImage);
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation<NavigationProp["navigation"]>();
  const dispatch = useAppDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  const iconColors = useMemo(
    () => (withLightButtons ? colors.white : iconColor ?? elementColor),
    [withLightButtons, elementColor, iconColor]
  );

  // Temporary solution until we have a proper profile screen
  const onProfilePress = () => {
    const options = [messages.logout, messages.cancel].map((message) =>
      formatMessage(message)
    );

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (selectedIndex?: number) => {
        if (selectedIndex === 0) {
          dispatch(logout());
        }
      }
    );
  };

  const goToMessages = React.useCallback(() => {
    navigation.navigate(routes.messages);
  }, [navigation]);

  return (
    <HeaderBarContainer
      style={{ marginTop: safeAreaInsets.top + HEADER_BAR_TOP_OFFSET }}
    >
      <HeaderBarBackButtonContainer>
        {withBackButton && navigation.canGoBack() && (
          <BackButton
            hasText
            text={backButtonText}
            lightBackButton={withLightButtons}
          />
        )}
      </HeaderBarBackButtonContainer>

      <HeaderIconsContainer>
        {withCastButton ? (
          <HeaderIconWrapper isFirst>
            <Icon name="cast" size={IconSizes.Medium} color={iconColors} />
          </HeaderIconWrapper>
        ) : null}

        {withChatButton ? (
          <HeaderIconWrapper>
            <IconWithBadge
              badgeText="7"
              onPress={goToMessages}
              name="chat"
              size={IconSizes.Medium}
              color={iconColors}
            />
          </HeaderIconWrapper>
        ) : null}

        <HeaderAvatar onPress={onProfilePress}>
          {profileImage ? (
            <AvatarImage
              source={{
                uri: profileImage,
              }}
            />
          ) : (
            <>
              <HeaderAvatarPlaceholderBackground />

              <Icon
                name="account-circle"
                size={IconSizes.Large}
                color={colors.orange}
              />
            </>
          )}
        </HeaderAvatar>
      </HeaderIconsContainer>
    </HeaderBarContainer>
  );
}
