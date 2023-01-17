import * as React from "react";
import Constants from "expo-constants";
import Autocomplete from "react-google-autocomplete";

import { useNavigation } from "@react-navigation/native";

import { formatMessage } from "~/utils/translation";
import { messages } from "./intl";
import { Container, CloseIcon, webStyle } from "./styles";

interface Props {
  route: {
    params: {
      onPress: (location: string) => void;
      value?: string;
    };
  };
}

export const LocationModal = React.memo<Props>(
  ({
    route: {
      params: { onPress, value },
    },
  }) => {
    const placeholder = formatMessage(messages.placeholder);
    const navigation = useNavigation();

    const handleOnPress = React.useCallback(
      ({ formatted_address }: { formatted_address: string }) => {
        onPress(formatted_address);
        navigation.goBack();
      },
      [navigation]
    );

    const handleClose = React.useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const ref = React.useRef();

    React.useEffect(() => {
      if (value) {
        ref?.current?.setAddressText(value);
      }
    }, []);

    return (
      <Container>
        <CloseIcon onPress={handleClose} />
        <Autocomplete
          defaultValue={value}
          apiKey={Constants?.expoConfig?.extra?.googlePlacesApiKey}
          onPlaceSelected={handleOnPress}
          placeholder={placeholder}
          style={webStyle.inputBox}
        />
      </Container>
    );
  }
);
