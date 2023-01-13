import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors } from "~/styles/theme";
import { PlanBackButtonContainer } from "./styles";
import { IconSizes } from "~/components/icon";

export const PlanBackButton = () => {
  const navigation = useNavigation();

  const handleOnPress = React.useCallback(
    () => navigation.goBack(),
    [navigation]
  );

  return (
    <PlanBackButtonContainer onPress={handleOnPress}>
      <Icon
        name="chevron-left"
        size={IconSizes.XLarge}
        color={colors.black}
      />
    </PlanBackButtonContainer>
  );
};
