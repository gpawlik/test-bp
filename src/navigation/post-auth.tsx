import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { TabBar } from "~/components/tab-bar";

import { HomeStack, HomeStackParamList } from "./home-stack";
import { LibraryStack, LibraryStackParamList } from "./library-stack";
import { BibleStack, BibleStackParamList } from "./bible-stack";
import { NotesStack, NotesStackParamList } from "./notes-stack";
import { GroupsStack, GroupsStackParamList } from "./groups-stack";
import { Messages } from "~/screens/messages";
import { GroupChat } from "~/screens/group-chat";

export type TabParamList = {
  [routes.homeTab]: NavigatorScreenParams<HomeStackParamList>;
  [routes.libraryTab]: NavigatorScreenParams<LibraryStackParamList>;
  [routes.bibleTab]: NavigatorScreenParams<BibleStackParamList>;
  [routes.notesTab]: NavigatorScreenParams<NotesStackParamList>;
  [routes.groupsTab]: NavigatorScreenParams<GroupsStackParamList>;
};

export type PostAuthParamList = {
  [routes.messages]: undefined;
  [routes.groupChat]: {
    groupId: string;
  };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.home}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name={routes.homeTab} component={HomeStack} />
      <Tab.Screen name={routes.libraryTab} component={LibraryStack} />
      <Tab.Screen name={routes.bibleTab} component={BibleStack} />
      <Tab.Screen name={routes.notesTab} component={NotesStack} />
      <Tab.Screen name={routes.groupsTab} component={GroupsStack} />
    </Tab.Navigator>
  );
};

export const PostAuthNavigator = React.memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.home} component={TabNavigator} />
      <Stack.Screen name={routes.messages} component={Messages} />
      <Stack.Screen name={routes.groupChat} component={GroupChat} />
    </Stack.Navigator>
  );
});
