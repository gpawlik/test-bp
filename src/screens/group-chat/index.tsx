import * as React from "react";
import { Platform, Keyboard, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppSelector } from "~/state/hooks";
import { getGroupById } from "~/state/groups/selectors";
import {
  getUserId,
  getProfileImage,
  getUserFirstName,
} from "~/state/user/selectors";
import { PostAuthParamList } from "~/navigation/post-auth";
import { GroupHeaderBar } from "~/components/group-header-bar";
import { ChatMessage } from "~/components/chat";

import { InputBox } from "./components/input-box";

import { Container, Content, ChatContent } from "./styles";
import { data as mockData } from "./mock";

export type Props = NativeStackScreenProps<PostAuthParamList, "group.chat">;

export const GroupChat = ({
  route: {
    params: { groupId },
  },
}: Props) => {
  const data = useAppSelector((state) => getGroupById(state, groupId));
  const currentUserId = useAppSelector(getUserId);
  const currentUserImage = useAppSelector(getProfileImage);
  const currentUserName = useAppSelector(getUserFirstName);

  const [messages, setMessages] = React.useState(mockData);
  const scrollViewRef = React.useRef<ScrollView>();

  const onContentChange = React.useCallback(
    () => scrollViewRef?.current?.scrollToEnd({ animated: true }),
    []
  );

  React.useEffect(() => {
    const showKeyboardSubscription = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        onContentChange();
      }
    );

    return () => {
      showKeyboardSubscription.remove();
    };
  }, [onContentChange]);

  const onSubmitMessage = React.useCallback(
    (content: string) => {
      if (!content.trim()) {
        return;
      }
      const timestamp = new Date().getTime();
      const newMessage = {
        id: `${timestamp}`,
        timestamp,
        content,
        userId: currentUserId,
        userName: currentUserName,
        imageUri: currentUserImage,
        type: "text",
      };
      // TODO: in the future save the messages in Firebase
      setMessages([...messages, newMessage]);
    },
    [setMessages, messages, currentUserId, currentUserImage, currentUserName]
  );

  if (!data) {
    return null;
  }
  const { name, uri } = data;

  return (
    <Container>
      <Content behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <GroupHeaderBar groupId={groupId} uri={uri} name={name} hideChatIcon />

        <ChatContent ref={scrollViewRef} onContentSizeChange={onContentChange}>
          {messages.map(
            ({ id, content, userId, userName, imageUri, timestamp }, index) => {
              const lastTimestamp = messages[index - 1]?.timestamp;
              // After 30s start displaying the header again
              const isFirst =
                !lastTimestamp || timestamp - lastTimestamp > 30000;
              const isCurrentUser = userId === currentUserId;
              const image = isCurrentUser ? currentUserImage : imageUri;

              return (
                <ChatMessage
                  key={`${id}${timestamp}`}
                  isReversed={isCurrentUser}
                  isFirst={isFirst}
                  text={content}
                  name={userName}
                  imageUri={image}
                  timestamp={timestamp}
                />
              );
            }
          )}
        </ChatContent>

        <InputBox onSubmit={onSubmitMessage} />
      </Content>
    </Container>
  );
};
