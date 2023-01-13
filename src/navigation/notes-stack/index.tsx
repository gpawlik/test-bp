import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { Notes } from "~/screens/notes";
import { SessionNotes } from "~/screens/notes-session";
import { SessionNotesView } from "~/screens/notes-session-view";

const Stack = createNativeStackNavigator();

export type NotesStackParamList = {
  [routes.notes]: undefined;
  [routes.sessionNotes]: undefined;
  [routes.sessionNotesView]: { sessionId: string };
};

export const NotesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.notes} component={Notes} />
      <Stack.Screen name={routes.sessionNotes} component={SessionNotes} />
      <Stack.Screen
        name={routes.sessionNotesView}
        component={SessionNotesView}
      />
    </Stack.Navigator>
  );
};
