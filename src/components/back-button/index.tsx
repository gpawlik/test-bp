import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Text, Icon } from "./styles";
import { messages } from "./intl";

interface Props {
  hasText?: boolean;
  lightBackButton?: boolean;
  text?: MessageDescriptor;
  onPress?: () => void;
}

export const BackButton = React.memo<Props>(
  ({ hasText, lightBackButton = false, text, onPress }) => {
    const navigation = useNavigation();

    const handleGoBack = React.useCallback(() => {
      if (typeof onPress === "function") {
        onPress();
        return;
      }
      navigation.goBack();
    }, [navigation]);

    return (
      <Container onPress={handleGoBack}>
        <Icon
          onPress={handleGoBack}
          icon="chevron-left"
          lightBackButtonIcon={lightBackButton}
        />
        {hasText || text ? (
          <Text lightBackButtonText={lightBackButton}>
            {text || messages.buttonBack}
          </Text>
        ) : null}
      </Container>
    );
  }
);
