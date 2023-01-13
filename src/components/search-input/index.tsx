import * as React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";

import { formatMessage } from "~/utils/translation";
import { colors } from "~/styles/theme";

import { Container, Input } from "./styles";

interface Props {
  value: string;
  placeholder: MessageDescriptorValues;
  onChange: (arg0: string) => void;
}

export const SearchInput = React.memo<Props>(
  ({ value, placeholder, onChange }) => {
    const translatedPlaceholder = formatMessage(placeholder);
    return (
      <Container>
        <Icon name="search" size={20} color={colors.gray400} />
        <Input
          value={value}
          placeholder={translatedPlaceholder}
          onChangeText={onChange}
        />
      </Container>
    );
  }
);
