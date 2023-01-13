import * as React from "react";
import { ScrollView, Share } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import { Button } from "~/components/button";

import { ChangeImage } from "../change-image";
import { InviteLink } from "../invite-link";
import { Members } from "../members";

import { SectionBox } from "../../styles";
import { Header, Title, EditButton, EditText, SectionTitle } from "./styles";
import { messages } from "./intl";

interface Props {
  onEdit: () => void;
  groupName?: string;
}

export const GroupOverview = React.memo<Props>(({ onEdit, groupName = "" }) => {
  const url = "bep.ly/4123asdsgfaxyyz";

  const shareLink = async () => {
    await Share.share({
      message: url,
    });
  };

  return (
    <RootSiblingParent>
      <ScrollView>
        <ChangeImage groupName={groupName} isDisabled />

        <Header>
          <Title>{groupName}</Title>

          <EditButton onPress={onEdit}>
            <EditText>{messages.editButton}</EditText>
          </EditButton>
        </Header>

        <SectionBox>
          <SectionTitle>{messages.inviteSection}</SectionTitle>
          <InviteLink url={url} />
        </SectionBox>

        <SectionBox>
          <Button text={messages.button} onPress={shareLink} iconType="send" />
        </SectionBox>

        <SectionBox>
          <SectionTitle>{messages.membersSection}</SectionTitle>
          <Members />
        </SectionBox>
      </ScrollView>
    </RootSiblingParent>
  );
});
