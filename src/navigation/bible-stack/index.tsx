import * as React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import * as routes from "~/constants/routes";
import { Bible } from "~/screens/bible";
import { BooksModal } from "~/screens/books-modal";
import { VersionModal } from "~/screens/version-modal";

export type BibleStackParamList = {
  [routes.bible]: {
    scripture?: string;
  };
  [routes.booksModal]: undefined;
  [routes.versionModal]: undefined;
};

export type BibleProps = NativeStackScreenProps<BibleStackParamList, "bible">;

const Stack = createNativeStackNavigator();

export const BibleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.bible} component={Bible} />
      <Stack.Screen
        name={routes.booksModal}
        component={BooksModal}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name={routes.versionModal}
        component={VersionModal}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
