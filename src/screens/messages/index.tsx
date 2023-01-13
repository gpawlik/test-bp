import * as React from "react";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { PostAuthParamList } from "~/navigation/post-auth";
import { HeaderBar } from "~/components/header-bar";
import { ListItem } from "~/components/list-item";
import { EmptyGroup } from "~/components/empty-group";
import { colors } from "~/styles/theme";

import { useAppSelector } from "~/state/hooks";
import { getChatMessagesByGroup } from "~/state/chat/selectors";

import { Container, HeaderContainer, HeaderTitle } from "./styles";
import { messages } from "./intl";

const getTimeFormat = (timestamp: number) => {
  if (isToday(timestamp)) {
    return format(timestamp, "hh:mm");
  }
  if (isYesterday(timestamp)) {
    return messages.yesterday;
  }
  if (isThisWeek(timestamp)) {
    return format(timestamp, "EEE");
  }
  return format(timestamp, "LLL d");
};

export type ChatProps = NativeStackScreenProps<PostAuthParamList, "group.chat">;

export const Messages = () => {
  const navigation = useNavigation<ChatProps["navigation"]>();
  const data = useAppSelector(getChatMessagesByGroup);
  const hasData = data.length;

  const handleOpenChat = React.useCallback(
    (groupId: string) => navigation.navigate(routes.groupChat, { groupId }),
    [navigation]
  );

  return (
    <Container>
      <HeaderBar iconColor={colors.black} withCastButton={false} />

      <HeaderContainer hasBorder={hasData}>
        <HeaderTitle>{messages.title}</HeaderTitle>
      </HeaderContainer>

      {hasData ? (
        data.map(
          ({
            id,
            senderName,
            text,
            groupId,
            groupName,
            groupUri,
            timestamp,
            isCurrentUser,
            isRead,
          }) => {
            const description = isCurrentUser
              ? { ...messages.userText, values: { text } }
              : { ...messages.text, values: { senderName, text } };
            const time = getTimeFormat(timestamp);
            return (
              <ListItem
                key={id}
                title={groupName}
                description={description}
                uri={groupUri}
                onPress={() => handleOpenChat(groupId)}
                rightText={time}
                numberOfLines={2}
                isHighlighted={!isRead}
                hasAvatar
              />
            );
          }
        )
      ) : (
        <EmptyGroup />
      )}
    </Container>
  );
};
