import * as React from "react";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";

import { ChangeImage } from "../change-image";
import { SectionBox } from "../../styles";
import { messages } from "./intl";

interface Props {
  isCreateMode: boolean;
  groupName?: string;
}

export const GroupCreateEdit = React.memo<Props>(
  ({ isCreateMode, groupName = "" }) => {
    const [name, setName] = React.useState(groupName);

    const buttonText = isCreateMode
      ? messages.buttonCreate
      : messages.buttonSave;

    return (
      <>
        <ChangeImage groupName={name} />

        <SectionBox>
          <TextInput
            label={messages.placeholder}
            value={name}
            onChangeText={setName}
          />
        </SectionBox>

        <Button text={buttonText} onPress={() => {}} isDisabled={!name} />
      </>
    );
  }
);
