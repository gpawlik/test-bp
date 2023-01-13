import * as React from "react";
import { useRoute } from "@react-navigation/native";
import type { SessionRouteProp } from "~/screens/session/types";
import { SectionOrder, useGetSessionQuery } from "~/state/flamelink";
import {
  Container,
  GestureRecognizerContainer,
  ScrollViewFakePadding,
} from "./styles";
import { VolumeOverview } from "./components/volume-overview";
import { Day } from "./components/day";
import { SessionFooter } from "./components/footer";
import { Watch } from "./components/watch";
import { Consider } from "./components/consider";
import { Reflect } from "./components/reflect";
import { Engage } from "./components/engage";
import { ListenToGod } from "./components/listen-to-god";

interface ContentProps {
  currentDay: number;
  setCurrentDay: (value: React.SetStateAction<number>) => void;
}

export const Content: React.FC<ContentProps> = ({
  currentDay,
  setCurrentDay,
}) => {
  const {
    params: { sessionId },
  } = useRoute<SessionRouteProp>();
  const { data } = useGetSessionQuery(sessionId);
  const [currentSection, setCurrentSection] = React.useState<number>(0);

  const daysLength = data?.days?.length ?? 0;
  const dayId = data?.days[currentDay === 0 ? 0 : currentDay - 1];

  const sectionOrderLength = data?.sectionOrder?.length ?? 0;
  const shouldRenderDays = currentDay > 0;

  const navigateToPreviousSection = React.useCallback(() => {
    if (currentSection === 0) return;

    setCurrentSection((val) => val - 1);
  }, [currentSection]);

  const navigateToPreviousDay = React.useCallback(() => {
    if (currentDay === 0) return;

    setCurrentDay((val) => val - 1);
  }, [currentDay, setCurrentDay]);

  const navigatePrevious = React.useCallback(
    (isSwiping?: boolean) => {
      shouldRenderDays
        ? !isSwiping && navigateToPreviousDay()
        : navigateToPreviousSection();
    },
    [navigateToPreviousDay, navigateToPreviousSection, shouldRenderDays]
  );

  const navigateToNextSection = React.useCallback(() => {
    if (sectionOrderLength && currentSection === sectionOrderLength - 1) return;

    setCurrentSection((val) => val + 1);
  }, [currentSection, sectionOrderLength]);

  const navigateToNextDay = React.useCallback(() => {
    if (daysLength && currentDay === daysLength) return;

    setCurrentDay((val) => val + 1);
  }, [currentDay, daysLength, setCurrentDay]);

  const navigateNext = React.useCallback(
    (isSwiping?: boolean) => {
      shouldRenderDays
        ? !isSwiping && navigateToNextDay()
        : navigateToNextSection();
    },
    [shouldRenderDays, navigateToNextDay, navigateToNextSection]
  );

  if (!data) return null;

  const renderSection = () => {
    const sectionToRender = data?.sectionOrder?.[currentSection] ?? null;

    switch (sectionToRender) {
      case SectionOrder.VolumeOverview:
        return <VolumeOverview volumeOverview={data.volumeOverview} />;
      case SectionOrder.Watch:
        return data?.watch ? <Watch watch={data.watch} /> : null;
      case SectionOrder.Consider:
        return data?.consider ? <Consider consider={data.consider} /> : null;
      case SectionOrder.Reflect:
        return data?.reflect ? <Reflect reflect={data.reflect} /> : null;
      case SectionOrder.Engage:
        return data?.engage ? <Engage engage={data.engage} /> : null;
      case SectionOrder.ListenToGod:
        return data?.listenToGod ? (
          <ListenToGod listenToGod={data.listenToGod} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <GestureRecognizerContainer
      onSwipeRight={() => navigatePrevious(true)}
      onSwipeLeft={() => navigateNext(true)}
    >
      <Container>
        {shouldRenderDays && dayId ? <Day dayId={dayId} /> : renderSection()}

        <SessionFooter
          navigatePrevious={navigatePrevious}
          navigateNext={navigateNext}
          daysLength={shouldRenderDays ? daysLength : sectionOrderLength}
          currentDay={shouldRenderDays ? currentDay : currentSection}
          shouldRenderDays={shouldRenderDays}
          heading={data?.volumeOverview?.heading ?? ""}
        />

        <ScrollViewFakePadding />
      </Container>
    </GestureRecognizerContainer>
  );
};
