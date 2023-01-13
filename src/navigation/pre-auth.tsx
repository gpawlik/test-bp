import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

import * as routes from "~/constants/routes";
import { Login } from "~/screens/login";
import { SignUp } from "~/screens/sign-up";
import { CreateProfile } from "~/screens/create-profile";
import { LocationModal } from "~/screens/location-modal";
import { PrefixModal } from "~/screens/prefix-modal";
import { useAppSelector } from "~/state/hooks";
import { getUser } from "~/state/user/selectors";

export type PreAuthStackParamList = {
  [routes.locationModal]: {
    onPress: (value: string) => void;
    value: string;
    type: string;
  };
  [routes.prefixModal]: { onPress: (value: string) => void; value: string };
};

export type PreAuthNavigationProps = StackNavigationProp<PreAuthStackParamList>;

const Stack = createNativeStackNavigator();

export const PreAuthNavigator = React.memo(() => {
  const user = useAppSelector(getUser);
  const initialRoute = user ? routes.createProfile : routes.login;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <Stack.Group>
          <Stack.Screen name={routes.login} component={Login} />
          <Stack.Screen name={routes.signUp} component={SignUp} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={routes.createProfile} component={CreateProfile} />
        </Stack.Group>
      )}

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name={routes.locationModal} component={LocationModal} />
        <Stack.Screen name={routes.prefixModal} component={PrefixModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
});
