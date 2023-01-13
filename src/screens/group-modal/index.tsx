import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import { useAppSelector } from "~/state/hooks";
import { getGroupById } from "~/state/groups/selectors";
import { ModalHeader } from "~/components/modal-header";

import { GroupCreateEdit } from "./components/create-edit";
import { GroupOverview } from "./components/overview";

import { Container, Content } from "./styles";
import { messages } from "./intl";

interface Props {
  route: {
    params: {
      groupId?: string;
    };
  };
}

export const GroupModal = React.memo<Props>(
  ({ route: { params: { groupId = "" } = {} } }) => {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const data = useAppSelector((state) => getGroupById(state, groupId));

    const navigation = useNavigation();

    const handleOnPress = React.useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const handleClose = React.useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const setEditMode = React.useCallback(() => {
      setIsEditMode(true);
    }, [setIsEditMode]);

    const isCreateMode = !groupId;
    const modalTitle = isCreateMode
      ? messages.titleCreate
      : isEditMode
      ? messages.titleEdit
      : undefined;

    return (
      <Container>
        <ModalHeader
          title={modalTitle}
          onLeftPress={handleClose}
          onRightPress={handleOnPress}
        />
        <Content>
          {isCreateMode || isEditMode ? (
            <GroupCreateEdit
              isCreateMode={isCreateMode}
              groupName={data?.name}
            />
          ) : (
            <GroupOverview groupName={data?.name} onEdit={setEditMode} />
          )}
        </Content>
      </Container>
    );
  }
);
