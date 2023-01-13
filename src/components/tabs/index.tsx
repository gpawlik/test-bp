import React from "react";

import { Container, Label, LabelText } from "./styles";

interface Props {
  labels: MessageDescriptor[];
  onPress: (index: number) => void;
}

export const Tabs = React.memo<Props>(({ labels, onPress }) => {
  const [tab, setTab] = React.useState(0);

  const handleOnPress = React.useCallback((index: number) => {
    setTab(index);
    onPress(index);
  }, []);

  return (
    <Container>
      {labels.map((label, index) => (
        <Label
          key={index}
          onPress={() => handleOnPress(index)}
          isActive={tab === index}
        >
          <LabelText>{label}</LabelText>
        </Label>
      ))}
    </Container>
  );
});
