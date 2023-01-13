import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { linkingConfiguration } from "./linking-config";
import { PostAuthNavigator } from "./post-auth";
import { PreAuthNavigator } from "./pre-auth";
import { useAppSelector } from "~/state/hooks";
import { getHasProfile } from "~/state/user/selectors";
import { formatDocumentTitle } from "./utils";

export const Navigation = React.memo(() => {
  const hasProfile = useAppSelector(getHasProfile);

  return (
    <NavigationContainer
      linking={linkingConfiguration}
      documentTitle={{
        formatter: (options, route) =>
          formatDocumentTitle(options?.title, route?.name),
      }}
    >
      {!!hasProfile ? <PostAuthNavigator /> : <PreAuthNavigator />}
    </NavigationContainer>
  );
});
