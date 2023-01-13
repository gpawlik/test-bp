import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, IconSizes, IconTypes } from "~/components/icon";
import { TabParamList } from "~/navigation/post-auth";
import { messages } from "~/screens/session/intl";
import { colors } from "~/styles/theme";
import { formatMessage } from "~/utils/translation";
import * as routes from "~/constants/routes";

import { ScriptureContainer, ScriptureText } from "./styles";

type ScriptureNavigationProp = NativeStackScreenProps<
  TabParamList,
  "library.tab"
>;

interface ScriptureProps {
  scripture: string;
}

export const Scripture: React.FC<ScriptureProps> = ({ scripture }) => {
  const navigation = useNavigation<ScriptureNavigationProp["navigation"]>();

  const onPress = React.useCallback(() => {
    navigation.navigate(routes.bibleTab, {
      screen: routes.bible,
      params: { scripture },
    });
  }, [scripture]);

  return (
    <ScriptureContainer onPress={onPress}>
      <Icon
        type={IconTypes.Bible}
        color={colors.primaryBlue}
        size={IconSizes.Medium}
      />

      <ScriptureText>
        {formatMessage(messages.scripture, { scripture })}
      </ScriptureText>
    </ScriptureContainer>
  );
};
