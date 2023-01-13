import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors } from "~/styles/theme";
import { GenericErrorContainer, IconContainer, Message } from "./styles";
import { messages } from "./intl";
import { Text2 } from "../text";
import { IconSizes } from "../icon";

export function GenericError() {
  const navigation = useNavigation();

  const onPress = React.useCallback(() => navigation.goBack(), [navigation]);

  return (
    <GenericErrorContainer>
      <IconContainer>
        <Icon name="error-outline" size={IconSizes.Logo} color={colors.primaryBlue} />
      </IconContainer>

      <Message>{messages.error}</Message>

      <Button mode="contained" onPress={onPress} color={colors.primaryBlue}>
        <Text2 color={colors.white}>{messages.continue}</Text2>
      </Button>
    </GenericErrorContainer>
  );
}
