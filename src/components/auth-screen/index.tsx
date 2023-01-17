import * as React from "react";
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { BackButton } from "~/components/back-button";
import { SocialButton } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { useAppDispatch } from "~/state/hooks";
import { loginWithApple, loginWithGoogle } from "~/state/user/actions";

import { SvgBackground } from "./background";
import {
  Container,
  Content,
  TopContainer,
  BackgroundWrapper,
  BottomContainer,
  Gradient,
  Title,
  ButtonBox,
  gradientColors,
} from "./styles";
import { messages } from "./intl";

interface Props {
  title: MessageDescriptor;
  children: React.ReactNode;
  hideSocialButtons?: boolean;
  hasBackButton?: boolean;
}

WebBrowser.maybeCompleteAuthSession();

export const AuthScreen = React.memo<Props>(
  ({ title, children, hideSocialButtons, hasBackButton, id }) => {
    const dispatch = useAppDispatch();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: Constants?.expoConfig?.extra?.clientId,
      scopes: ["email", "profile"],
    });

    React.useEffect(() => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        dispatch(loginWithGoogle({ idToken: id_token }));
      }
    }, [response, dispatch]);

    const handleLoginWithApple = React.useCallback(() => {
      dispatch(loginWithApple());
    }, [dispatch]);

    return (
      <Container>
        <Gradient colors={[gradientColors.start1, gradientColors.stop1]} />

        <TopContainer hasBackButton={hasBackButton}>
          <BackgroundWrapper isShort={hideSocialButtons}>
            <SvgBackground id={id} />
          </BackgroundWrapper>
          {hasBackButton ? <BackButton hasText /> : null}

          <Content>
            <Title>{title}</Title>
            {children}
          </Content>
        </TopContainer>

        <BottomContainer isShort={hideSocialButtons}>
          {!hideSocialButtons ? (
            <Content>
              {Platform.OS === "ios" ? (
                <ButtonBox>
                  <SocialButton
                    text={messages.buttonApple}
                    onPress={handleLoginWithApple}
                    type={ButtonTypes.Apple}
                  />
                </ButtonBox>
              ) : null}

              <ButtonBox>
                <SocialButton
                  text={messages.buttonGoogle}
                  onPress={() => promptAsync()}
                  type={ButtonTypes.Google}
                />
              </ButtonBox>
            </Content>
          ) : null}
        </BottomContainer>
      </Container>
    );
  }
);
