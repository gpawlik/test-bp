import * as React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { GroupsProps } from "~/navigation/groups-stack";
import { HeaderBar } from "~/components/header-bar";
import { IconSizes } from "~/components/icon";
import { ListItem } from "~/components/list-item";
import { EmptyGroup } from "~/components/empty-group";
import { colors } from "~/styles/theme";

import { useAppSelector } from "~/state/hooks";
import { getGroups } from "~/state/groups/selectors";

import { Container, HeaderContainer, HeaderTitle, IconButton } from "./styles";
import { messages } from "./intl";

export const Groups = () => {
  const navigation = useNavigation<GroupsProps["navigation"]>();
  const data = useAppSelector(getGroups);

  const handleGroupPress = React.useCallback(
    (groupId: string) =>
      navigation.navigate(routes.groupResources, { groupId }),
    [navigation]
  );

  const handleCreate = React.useCallback(
    () => navigation.navigate(routes.groupModal),
    [navigation]
  );

  const hasData = data.length;

  return (
    <Container>
      <HeaderBar iconColor={colors.black} withBackButton={false} />

      <HeaderContainer hasBorder={hasData}>
        <HeaderTitle>{messages.title}</HeaderTitle>

        <IconButton onPress={handleCreate}>
          <Icon name="add" size={IconSizes.Medium} color={colors.black} />
        </IconButton>
      </HeaderContainer>

      {hasData ? (
        data.map(({ id, name, uri, memberCount: count }) => {
          const description =
            count === 1
              ? messages.oneMember
              : { ...messages.members, values: { count } };

          return (
            <ListItem
              key={id}
              title={name}
              description={description}
              uri={uri}
              onPress={() => handleGroupPress(id)}
              hasAvatar
            />
          );
        })
      ) : (
        <EmptyGroup />
      )}
    </Container>
  );
};
