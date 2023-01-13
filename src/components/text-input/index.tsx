import * as React from "react";
import { TextInputProps, TextInput as RnTextIput } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { formatMessage, isIntlDescriptor } from "~/utils/translation";
import { IconTypes } from "~/components/icon";
import { MessageDescriptor } from "~/types/messages";

import {
  Container,
  Input,
  IconButton,
  StyledIcon,
  ErrorMessage,
  MaskedInputContainer,
  Overlay,
  styles,
} from "./styles";

type Props = TextInputProps & {
  label: MessageDescriptor;
  value: string;
  onChangeText: (arg0: string) => void;
  mask?: string;
  isSecure?: boolean;
  errorMessage?: MessageDescriptor;
  onOverlayPress?: () => void;
};

export const TextInput = React.memo(
  ({
    label,
    isSecure,
    secureTextEntry,
    errorMessage,
    onOverlayPress,
    mask,
    ...rest
  }: Props) => {
    const [passwordVisibility, setPasswordVisibility] =
      React.useState(secureTextEntry);
    const formattedLabel = isIntlDescriptor(label)
      ? formatMessage(label)
      : label;
    const rightIcon = passwordVisibility
      ? IconTypes.EyeNotVisible
      : IconTypes.EyeOpen;

    const onIconPress = () => {
      setPasswordVisibility(!passwordVisibility);
    };

    const optionalProps = mask
      ? {
          render: (props: any) => (
            <MaskedInputContainer>
              <TextInputMask
                {...props}
                style={styles.input}
                type="custom"
                options={{ mask }}
              />
            </MaskedInputContainer>
          ),
        }
      : {};

    return (
      <>
        <Container>
          <Input
            label={formattedLabel as string}
            secureTextEntry={passwordVisibility}
            error={!!errorMessage}
            {...optionalProps}
            {...rest}
          />
          {secureTextEntry ? (
            <IconButton onPress={onIconPress}>
              <StyledIcon
                type={rightIcon}
                size={20}
                isActive={!passwordVisibility}
              />
            </IconButton>
          ) : null}
          {onOverlayPress ? <Overlay onPress={onOverlayPress} /> : null}
        </Container>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </>
    );
  }
);
