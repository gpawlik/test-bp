import * as React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { Groups } from "~/screens/groups";
import { GroupResources } from "~/screens/group-resources";
import { GroupModal } from "~/screens/group-modal";

export type GroupsStackParamList = {
  [routes.groups]: undefined;
  [routes.groupResources]: {
    groupId: string;
  };
  [routes.groupModal]:
    | {
        groupId?: string;
      }
    | undefined;
};

export type GroupsProps = NativeStackScreenProps<
  GroupsStackParamList,
  "groups"
>;

const Stack = createNativeStackNavigator();

export const GroupsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.groups} component={Groups} />
      <Stack.Screen name={routes.groupResources} component={GroupResources} />
      <Stack.Screen
        name={routes.groupModal}
        component={GroupModal}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
