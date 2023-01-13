import * as React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { TextInput } from "~/components/text-input";

import { formatMessage } from "~/utils/translation";

export type Options = {
  id: string;
  label: MessageDescriptorValues;
};

interface Props {
  label: MessageDescriptorValues;
  value: string;
  options: Options[];
  onChangeText: (arg0: string) => void;
}

export const ModalInput = React.memo<Props>(
  ({ label, value, options, onChangeText }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const translatedOptions = options?.map(({ label: optionLabel }) =>
      formatMessage(optionLabel)
    );

    const onPress = () => {
      const cancelButtonIndex = options.length - 1;

      showActionSheetWithOptions(
        {
          options: translatedOptions,
          cancelButtonIndex,
        },
        (selectedIndex?: number) => {
          if (
            typeof selectedIndex === "number" &&
            selectedIndex !== cancelButtonIndex
          ) {
            onChangeText(options[selectedIndex].id);
          }
        }
      );
    };

    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={() => {}}
        onOverlayPress={onPress}
      />
    );
  }
);
