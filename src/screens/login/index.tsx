import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { AuthScreen } from "~/components/auth-screen";
import { InputBox } from "~/components/auth-screen/styles";
import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { TextInput } from "~/components/text-input";
import { useAppDispatch } from "~/state/hooks";
import { login } from "~/state/user/actions";
import { isValidEmail, isValidString } from "~/utils/strings";

import { messages } from "./intl";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<MessageDescriptor>();
  const [passwordError, setPasswordError] = React.useState<MessageDescriptor>();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const isValid = isValidEmail(email) && isValidString(password, 6);

  const resetEmailError = React.useCallback(() => setEmailError(undefined), []);
  const resetPasswordError = React.useCallback(
    () => setPasswordError(undefined),
    []
  );

  const handleError = React.useCallback((error: string) => {
    if (error.includes("auth/invalid-email")) {
      setEmailError(messages.errorEmail);
    }
    if (error.includes("auth/user-not-found")) {
      setEmailError(messages.userNotFound);
    }
    if (error.includes("auth/wrong-password")) {
      setPasswordError(messages.errorPassword);
    }
  }, []);

  const handleLogin = React.useCallback(() => {
    setEmailError(undefined);
    setPasswordError(undefined);
    setIsLoading(true);
    dispatch(
      login({
        email,
        password,
        onSuccess: () => setIsLoading(false),
        onError: (e) => {
          setIsLoading(false);
          handleError(e);
        },
      })
    );
  }, [dispatch, email, password]);

  const navigateToSignUp = React.useCallback(
    () => navigation.navigate(routes.signUp),
    [navigation]
  );

  return (
    <>
      <InputBox>
        <TextInput
          label={messages.email}
          value={email}
          onChangeText={setEmail}
          onFocus={resetEmailError}
          errorMessage={emailError}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          label={messages.password}
          value={password}
          onChangeText={setPassword}
          onFocus={resetPasswordError}
          errorMessage={passwordError}
          secureTextEntry
          isSecure
        />
      </InputBox>

      <Button
        text={messages.signIn}
        onPress={handleLogin}
        type={ButtonTypes.Primary}
        isDisabled={!isValid}
        isLoading={isLoading}
      />

      <Button
        text={messages.forgotPassword}
        onPress={() => {}}
        type={ButtonTypes.Secondary}
      />
      <Button
        text={messages.signUp}
        onPress={navigateToSignUp}
        type={ButtonTypes.Secondary}
      />
    </>
  );
};
