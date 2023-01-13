import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { Library } from "~/screens/library";
import { Plan } from "~/screens/plan";
import { Session } from "~/screens/session";
import { CompleteDay } from "~/screens/complete-day";
import { isAndroid } from "~/utils/platform";

export type LibraryStackParamList = {
  [routes.library]: undefined;
  [routes.plan]: {
    planId: string;
  };
  [routes.session]: {
    sessionId: string;
    planId: string;
    volumeIndex: number;
    sessionIndex: number;
    dayIndex: number;
  };
  [routes.completeDay]: {
    planId: string;
    day: number;
    heading?: string;
  };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name={routes.library} component={Library} />
      <Stack.Screen name={routes.plan} component={Plan} />
      <Stack.Screen name={routes.session} component={Session} />
      <Stack.Screen
        name={routes.completeDay}
        component={CompleteDay}
        options={{ presentation: isAndroid ? "modal" : "transparentModal" }}
      />
    </Stack.Navigator>
  );
};
