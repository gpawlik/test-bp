import React from "react";
import Carousel from "react-native-reanimated-carousel";
import Icon from "@expo/vector-icons/MaterialIcons";

import { useGetProgressQuery } from "~/state/content-progress";
import { IconSizes } from "~/components/icon";
import { ResourceEmpty } from "~/components/resource-empty";
import { windowWidth } from "~/utils/platform";
import { pxToNumber } from "~/utils/theme";
import { spacers } from "~/styles/theme";

import {
  carouselStyles,
  ResourcesContainer,
  ResourcesTopBar,
  ResourcesTopBarTitle,
  RESOURCE_HEIGHT,
} from "./styles";
import { messages } from "./intl";
import { ResourceItem } from "./components/resource-item";
import { DayBubbles } from "../day-bubbles";
import { getUniquePlansInProgress } from "~/state/content-progress/utils";

export function Resources() {
  const { data: progressData } = useGetProgressQuery("");
  const [sessionId, setSessionId] = React.useState(
    progressData?.[0]?.sessionId || ""
  );

  const uniquePlansInProgress = React.useMemo(
    () => getUniquePlansInProgress(progressData || []),
    [progressData]
  );

  const onActiveResource = React.useCallback(
    (index: number) => {
      const currentSessionId = progressData?.[index]?.sessionId || "";

      setSessionId(currentSessionId);
    },
    [progressData]
  );

  const resourcesSwipingEnabled = React.useMemo(
    () => !!progressData?.length,
    [progressData]
  );

  return (
    <ResourcesContainer>
      <ResourcesTopBar>
        <ResourcesTopBarTitle>{messages.resourcesTitle}</ResourcesTopBarTitle>

        <Icon name="more-horiz" size={IconSizes.Medium} />
      </ResourcesTopBar>

      {progressData?.length ? (
        <Carousel
          style={carouselStyles}
          width={windowWidth}
          height={RESOURCE_HEIGHT + pxToNumber(spacers.ss6)}
          data={uniquePlansInProgress}
          modeConfig={{
            snapDirection: "left",
            stackInterval: -pxToNumber(spacers.ss6),
          }}
          pagingEnabled
          mode={resourcesSwipingEnabled ? "vertical-stack" : undefined}
          enabled={resourcesSwipingEnabled}
          onSnapToItem={onActiveResource}
          renderItem={({ item }) => (
            <ResourceItem planId={item.planId} sessionId={item.sessionId} />
          )}
        />
      ) : (
        <ResourceEmpty text={messages.resourcesEmptyDescription} />
      )}

      <DayBubbles sessionId={sessionId} />
    </ResourcesContainer>
  );
}
