import * as React from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { PreAuthNavigationProps } from "~/navigation/pre-auth";
import { InputBox } from "~/components/auth-screen/styles";
import { TextInput } from "~/components/text-input";
import { PhoneInput } from "~/components/phone-input";
import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { useAppSelector } from "~/state/hooks";
import { getUserFirstName, getUserLastName } from "~/state/user/selectors";

import { messages } from "../intl";
import { BasicData } from "../types";
import { KeyboardAvoiding, Container, Content } from "../styles";

interface Props {
  onPress: (data: BasicData) => void;
  firstName?: string;
  lastName?: string;
  location?: string;
  prefix?: string;
  phone?: string;
}

export const BasicInputs = React.memo<Props>(
  ({
    onPress,
    firstName: defaultFirstName = "",
    lastName: defaultLastName = "",
    location: defaultLocation = "",
    prefix: defaultPrefix = "+1",
    phone: defaultPhone = "",
  }) => {
    const stateFirstName = useAppSelector(getUserFirstName);
    const stateLastName = useAppSelector(getUserLastName);
    const [firstName, setFirstName] = React.useState(
      defaultFirstName || stateFirstName
    );
    const [lastName, setLastName] = React.useState(
      defaultLastName || stateLastName
    );
    const [location, setLocation] = React.useState(defaultLocation);
    const [prefix, setPrefix] = React.useState(defaultPrefix);
    const [phone, setPhone] = React.useState(defaultPhone);
    const navigation = useNavigation<PreAuthNavigationProps>();

    const isValid = firstName && lastName && location;

    const handleOnPress = React.useCallback(() => {
      if (isValid) {
        onPress({ firstName, lastName, location, phone, prefix });
      }
    }, [isValid, firstName, lastName, location, prefix, phone, onPress]);

    const handleLocationPress = React.useCallback(() => {
      navigation.navigate(routes.locationModal, {
        onPress: setLocation,
        value: location,
        type: "(cities)",
      });
    }, [location, navigation]);

    React.useEffect(() => {
      (async () => {
        if (location) {
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        const locations = await Location.reverseGeocodeAsync(coords);
        if (locations.length) {
          const { city, region, isoCountryCode } = locations[0];
          setLocation([city, region, isoCountryCode].join(", "));
        }
      })();
    }, [location]);

    return (
      <>
        <KeyboardAvoiding>
          <Container>
            <Content>
              <InputBox>
                <TextInput
                  label={messages.firstName}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  key="firstName"
                />
                <TextInput
                  label={messages.lastName}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  key="lastName"
                />
                <TextInput
                  label={messages.location}
                  value={location}
                  onChangeText={setLocation}
                  onOverlayPress={handleLocationPress}
                  key="country"
                  multiline
                />
                <PhoneInput
                  label={messages.phone}
                  value={phone}
                  prefix={prefix}
                  onChangeText={setPhone}
                  onChangePrefix={setPrefix}
                  keyboardType="phone-pad"
                  key="phone"
                />
              </InputBox>
            </Content>
          </Container>
        </KeyboardAvoiding>

        <Button
          text={messages.buttonNext}
          onPress={handleOnPress}
          type={ButtonTypes.Primary}
          isDisabled={!isValid}
        />
      </>
    );
  }
);
