import * as React from "react";
import { Animated, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation, TabActions } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { BibleProps } from "~/navigation/bible-stack";
import { BackButton } from "~/components/back-button";
import { colors } from "~/styles/theme";

import {
  Container,
  Content,
  Background,
  LabelBox,
  Label,
  LabelText,
  BottomBox,
  MetaBox,
  MetaText,
  MetaTextBold,
} from "./styles";
import { messages } from "./intl";

const getAnimationProps = (useNativeDriver: boolean) => ({
  duration: 500,
  useNativeDriver,
});

interface Props {
  book: TextType;
  version: string;
  isCompact: boolean;
  scripture?: string;
  showScripture?: boolean;
}

const startColor = "#FFEBFC";
const stopColor = "#FFF1BE";

export const BibleHeader = React.memo<Props>(
  ({ book, version, scripture, showScripture, isCompact }) => {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const resizeAnim = React.useRef(new Animated.Value(80)).current;
    const navigation = useNavigation<BibleProps["navigation"]>();

    const fadeIn = () =>
      Animated.timing(fadeAnim, {
        toValue: 1,
        ...getAnimationProps(true),
      }).start();

    const fadeOut = () =>
      Animated.timing(fadeAnim, {
        toValue: 0,
        ...getAnimationProps(true),
      }).start();

    const squeeze = () =>
      Animated.timing(resizeAnim, {
        toValue: scripture ? 0 : 40,
        ...getAnimationProps(false),
      }).start();

    const expand = () =>
      Animated.timing(resizeAnim, {
        toValue: 80,
        ...getAnimationProps(false),
      }).start();

    React.useEffect(() => {
      if (isCompact) {
        fadeOut();
        squeeze();
      } else {
        fadeIn();
        expand();
      }
    }, [isCompact]);

    const opacity = { opacity: fadeAnim };

    const handleBackPress = React.useCallback(() => {
      navigation.dispatch(TabActions.jumpTo("library.tab"));
    }, [navigation]);

    const openBooksModal = React.useCallback(() => {
      navigation.navigate(routes.booksModal);
    }, [navigation]);

    const openVersionModal = React.useCallback(() => {
      navigation.navigate(routes.versionModal);
    }, [navigation]);

    return (
      <>
        <Container style={[{ height: resizeAnim }]}>
          <Animated.View style={[opacity]}>
            <Icon name="text-fields" size={20} color={colors.gray800} />
          </Animated.View>

          <Content style={scripture ? [opacity] : []}>
            <Animated.View style={[opacity, StyleSheet.absoluteFill]}>
              <Background
                colors={[startColor, stopColor]}
                start={{ x: 0.1, y: 0.2 }}
              />
            </Animated.View>

            {book ? (
              <LabelBox>
                <Label onPress={openBooksModal}>
                  <LabelText>{book}</LabelText>
                </Label>
                <Label onPress={openVersionModal} isLast>
                  <LabelText>{version}</LabelText>
                </Label>
              </LabelBox>
            ) : null}
          </Content>
          <Animated.View style={[opacity]}>
            <Icon name="cast" size={20} color={colors.gray800} />
          </Animated.View>
        </Container>

        {showScripture && scripture ? (
          <BottomBox>
            <BackButton text={messages.session} onPress={handleBackPress} />
            <MetaBox>
              <MetaText>{messages.selected}</MetaText>
              <MetaTextBold>{scripture}</MetaTextBold>
            </MetaBox>
          </BottomBox>
        ) : null}
      </>
    );
  }
);
