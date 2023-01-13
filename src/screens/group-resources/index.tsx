import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppSelector } from "~/state/hooks";
import { getGroupById } from "~/state/groups/selectors";
import { GroupsStackParamList } from "~/navigation/groups-stack";
import { ResourceEmpty } from "~/components/resource-empty";
import { GroupHeaderBar } from "~/components/group-header-bar";
import { ListItem } from "~/components/list-item";

import { ResourceItem, KidsResourceItem } from "./components/resource-item";
import { DownloadItem } from "./components/download-item";
import {
  Container,
  Content,
  Title,
  ResouceBox,
  Section,
  SessionsBox,
} from "./styles";
import { messages } from "./intl";
import { sessions, staticResources } from "./mocks";

export type Props = NativeStackScreenProps<
  GroupsStackParamList,
  "group.resources"
>;

export const GroupResources = ({
  route: {
    params: { groupId },
  },
}: Props) => {
  const data = useAppSelector((state) => getGroupById(state, groupId));
  if (!data) {
    return null;
  }
  const { name, uri, memberCount: count, plans } = data;
  const isKidsZone = name === "Kids Zone";

  return (
    <Container>
      <GroupHeaderBar groupId={groupId} uri={uri} name={name} count={count} />
      <Content>
        <Section>
          <Title>{messages.title}</Title>

          {isKidsZone ? (
            <KidsResourceItem onPress={() => {}} />
          ) : plans.length ? (
            plans.map((planId) => (
              <ResouceBox key={planId}>
                <ResourceItem id={planId} onPress={() => {}} />
              </ResouceBox>
            ))
          ) : (
            <ResourceEmpty />
          )}
        </Section>

        {isKidsZone ? (
          <Section>
            <Title>{messages.sections}</Title>
            <SessionsBox>
              {sessions.map(({ id, title, description }, index) => (
                <ListItem
                  key={id}
                  title={title}
                  description={description}
                  onPress={() => {}}
                  isLast={index === sessions.length - 1}
                />
              ))}
            </SessionsBox>
          </Section>
        ) : null}

        {isKidsZone ? (
          <Section>
            <Title>{messages.downloads}</Title>
            <SessionsBox>
              {staticResources.map(
                ({ id, title, type, isDownloaded }, index) => (
                  <DownloadItem
                    key={id}
                    title={title}
                    isDownloaded={isDownloaded}
                    type={type}
                    isLast={index === staticResources.length - 1}
                  />
                )
              )}
            </SessionsBox>
          </Section>
        ) : null}
      </Content>
    </Container>
  );
};
