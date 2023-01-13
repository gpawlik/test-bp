import * as React from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { colors } from "~/styles/theme";

import { Container, Input, ActionButton, TextInput } from "./styles";

interface Props {
  onSubmit: (text: string) => void;
}

export const InputBox = React.memo<Props>(({ onSubmit }) => {
  const [text, setText] = React.useState("");
  const handleSubmit = React.useCallback(() => {
    onSubmit(text);
    setText("");
  }, [onSubmit, setText, text]);

  return (
    <Container>
      <ActionButton>
        <Icon name="camera-outline" size={18} color={colors.gray700} />
      </ActionButton>

      <Input>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
        />
      </Input>

      <ActionButton>
        <Icon name="microphone-outline" size={20} color={colors.gray700} />
      </ActionButton>
    </Container>
  );
});
