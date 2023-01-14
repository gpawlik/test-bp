import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { AuthScreen } from "~/components/auth-screen";
import { InputBox } from "~/components/auth-screen/styles";
import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { TextInput } from "~/components/text-input";
import { useAppDispatch } from "~/state/hooks";
import { signup } from "~/state/user/actions";
import { isValidEmail, isValidString } from "~/utils/strings";

import { messages } from "./intl";

export const SignUp = () => {
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

  const handleSignUp = React.useCallback(() => {
    setEmailError(undefined);
    setPasswordError(undefined);
    setIsLoading(true);

    dispatch(
      signup({
        email,
        password,
        onSuccess: () => {
          setIsLoading(false);
          navigation.navigate(routes.createProfile);
        },
        onError: () => {
          setIsLoading(false);
        },
      })
    );
  }, [dispatch, email, password]);

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
          key="email"
        />
        <TextInput
          label={messages.password}
          value={password}
          onChangeText={setPassword}
          onFocus={resetPasswordError}
          errorMessage={passwordError}
          secureTextEntry
          isSecure
          key="password"
        />
      </InputBox>

      <Button
        text={messages.buttonNext}
        onPress={handleSignUp}
        type={ButtonTypes.Primary}
        isDisabled={!isValid}
        isLoading={isLoading}
      />
    </>
  );
};
