import * as React from "react";
import Markdown from "react-native-markdown-display";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { markdownStyles } from "./styles";
import * as routes from "~/constants/routes";
import { TabParamList } from "~/navigation/post-auth";

type RichTextNavigationProp = NativeStackScreenProps<
  TabParamList,
  "library.tab"
>;

interface RichTextProps {
  children: string;
}

export const RichText: React.FC<RichTextProps> = ({ children }) => {
  const navigation = useNavigation<RichTextNavigationProp["navigation"]>();

  const onLinkPress = React.useCallback((url: string) => {
    navigation.navigate(routes.bibleTab, {
      screen: routes.bible,
      params: { scripture: url },
    });

    return true;
  }, []);

  return (
    // @ts-ignore: children not properly typed in the library
    <Markdown style={markdownStyles} onLinkPress={onLinkPress}>
      {children}
    </Markdown>
  );
};
