import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { Home } from "~/screens/home";

export type HomeStackParamList = {
  [routes.home]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.home} component={Home} />
    </Stack.Navigator>
  );
};
