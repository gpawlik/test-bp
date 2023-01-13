import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { TabParamList } from "~/navigation/post-auth";
import { useAppSelector } from "~/state/hooks";
import {
  getPlanById,
  getPlanThumbnail,
  getSessionById,
} from "~/state/flamelink/selectors";

import { Container, Content, Description, Title, Image } from "./styles";

interface Props {
  planId: string;
  sessionId: string;
}

type HomeProps = NativeStackScreenProps<TabParamList, "home.tab">;

export const ResourceItem = React.memo<Props>(({ planId, sessionId }) => {
  const navigation = useNavigation<HomeProps["navigation"]>();

  const planData = useAppSelector((state) => getPlanById(state, planId));
  const planThumbnail = useAppSelector((state) =>
    getPlanThumbnail(state, planId)
  );
  const sessionData = useAppSelector((state) =>
    getSessionById(state, sessionId)
  );

  const handleResourcePress = React.useCallback(
    (id: string) => {
      navigation.navigate(routes.libraryTab, {
        screen: routes.plan,
        params: { planId: id },
      });
    },
    [navigation]
  );

  return (
    <Container key={`carousel-resource-${planData?.id}`}>
      <TouchableOpacity onPress={() => handleResourcePress(planData?.id ?? "")}>
        {planThumbnail ? <Image source={{ uri: planThumbnail }} /> : null}
      </TouchableOpacity>

      <Content>
        {planData?.title ? <Title>{planData?.title}</Title> : null}

        {sessionData?.title ? (
          <Description>{sessionData?.title}</Description>
        ) : null}
      </Content>

      {/* TODO: Hide until the groups logic is integrated
        <GroupAvatarContainer>
          <GroupAvatar
            text={"School Group"}
            uri={""}
            size={AvatarSize.Small}
          />
        </GroupAvatarContainer> */}
    </Container>
  );
});
