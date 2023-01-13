import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as routes from "~/constants/routes";
import { Icon, IconTypes } from "~/components/icon";
import { colors } from "~/styles/theme";

import { messages } from "./intl";
import { BarWrapper, TabButton, ButtonText } from "./styles";

export const menuItems = [
  {
    routeName: routes.homeTab,
    icon: IconTypes.Home,
    label: messages.home,
  },
  {
    routeName: routes.libraryTab,
    icon: IconTypes.Library,
    label: messages.library,
  },
  {
    routeName: routes.bibleTab,
    icon: IconTypes.Bible,
    label: messages.bible,
  },
  {
    routeName: routes.notesTab,
    icon: IconTypes.Notes,
    label: messages.notes,
  },
  {
    routeName: routes.groupsTab,
    icon: IconTypes.Groups,
    label: messages.groups,
  },
];

export const TabBar = React.memo<BottomTabBarProps>(({ navigation, state }) => {
  const activeRouteName = state.routeNames[state.index];
  const { bottom } = useSafeAreaInsets();

  return (
    <BarWrapper bottom={bottom}>
      {menuItems.map(({ routeName, icon, label }) => {
        const isFocused = activeRouteName === routeName;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: routeName,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: routeName,
              merge: true,
              params: undefined,
            });
          }
        };

        const color = isFocused ? colors.primaryBlue : colors.black;

        return (
          <TabButton onPress={onPress} key={routeName}>
            <Icon type={icon} color={color} />
            <ButtonText color={color}>{label}</ButtonText>
          </TabButton>
        );
      })}
    </BarWrapper>
  );
});
