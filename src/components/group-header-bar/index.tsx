import React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { IconWithBadge } from "~/components/icon/icon-with-badge";
import { GroupAvatar } from "~/components/group-avatar";
import { AvatarSize } from "~/components/group-avatar/types";
import { IconSizes } from "~/components/icon";
import { BackButton } from "~/components/back-button";

import { colors } from "~/styles/theme";

import { Container, SideBox, CenterBox, GroupText, IconBox } from "./styles";
import { messages } from "./intl";

interface Props {
  groupId: string;
  name: string;
  uri?: string;
  count?: number;
  hideChatIcon?: boolean;
}

export const GroupHeaderBar = React.memo<Props>(
  ({ groupId, name, uri, count = 0, hideChatIcon }) => {
    const navigation = useNavigation<{
      navigate: (route: string, options: { groupId: string }) => void;
      canGoBack: () => boolean;
    }>();

    const handleOpenModal = React.useCallback(
      () => navigation.navigate(routes.groupModal, { groupId }),
      [navigation, groupId]
    );

    const handleOpenChat = React.useCallback(
      () => navigation.navigate(routes.groupChat, { groupId }),
      [navigation, groupId]
    );

    const message = hideChatIcon
      ? name
      : { ...messages.text, values: { name, count } };

    return (
      <Container>
        <SideBox>{navigation.canGoBack() ? <BackButton /> : null}</SideBox>

        <CenterBox onPress={handleOpenModal}>
          <GroupAvatar text={name} uri={uri} size={AvatarSize.Small} />
          <GroupText>{message}</GroupText>
        </CenterBox>

        <SideBox>
          {!hideChatIcon ? (
            <IconBox>
              <IconWithBadge
                badgeText="7"
                onPress={handleOpenChat}
                name="chat"
                size={IconSizes.Medium}
                color={colors.black}
              />
            </IconBox>
          ) : null}
        </SideBox>
      </Container>
    );
  }
);
