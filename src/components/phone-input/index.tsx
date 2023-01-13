import * as React from "react";
import { TextInputProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { IconTypes } from "~/components/icon";

import {
  Container,
  PrefixSelector,
  SelectorText,
  LabelText,
  Input,
  TextBox,
  IconBox,
  CaretIcon,
} from "./styles";

export type Options = {
  id: string;
  label: MessageDescriptorValues;
};

type Props = TextInputProps & {
  label: MessageDescriptorValues;
  value: string;
  prefix: string;
  onChangeText: (arg0: string) => void;
  onChangePrefix: (arg0: string) => void;
};

export const PhoneInput = React.memo<Props>(
  ({ label, value, prefix, onChangeText, onChangePrefix, ...props }) => {
    const [mask, setMask] = React.useState("(999)-999-9999");
    const navigation = useNavigation();

    const onPress = React.useCallback(() => {
      navigation.navigate(routes.prefixModal, {
        onPress: (data: { prefix: string; mask?: string }) => {
          setMask(data?.mask || "999-999-999");
          onChangePrefix(data?.prefix);
        },
        value: prefix,
      });
    }, [prefix]);

    return (
      <Container>
        <Input
          value={value}
          onChangeText={onChangeText}
          mask={mask}
          {...props}
        />
        <PrefixSelector onPress={onPress}>
          <TextBox>
            <LabelText>{label}</LabelText>
            <SelectorText>{prefix}</SelectorText>
          </TextBox>
          <IconBox>
            <CaretIcon type={IconTypes.CaretDown} size={10} />
          </IconBox>
        </PrefixSelector>
      </Container>
    );
  }
);
