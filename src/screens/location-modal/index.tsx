import * as React from "react";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete, AutocompleteRequestType } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

import { formatMessage } from "~/utils/translation";
import { messages } from "./intl";
import { Container, CloseIcon } from "./styles";

interface Props {
  route: {
    params: {
      onPress: (location: string) => void;
      value?: string;
      type: AutocompleteRequestType;
    };
  };
}

export const LocationModal = React.memo<Props>(
  ({
    route: {
      params: { onPress, value, type },
    },
  }) => {
    const placeholder = formatMessage(messages.placeholder);
    const navigation = useNavigation();

    const handleOnPress = React.useCallback(
      ({ description }: { description: string }) => {
        onPress(description);
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
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          ref={ref}
          onPress={handleOnPress}
          query={{
            key: Constants?.expoConfig?.extra?.googlePlacesApiKey,
            language: "en",
            ...{ type }
          }}
          enablePoweredByContainer={false}
        />
      </Container>
    );
  }
);
