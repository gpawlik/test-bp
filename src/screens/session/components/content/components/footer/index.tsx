import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SessionRouteProp } from "~/screens/session/types";
import type { LibraryStackParamList } from "~/navigation/library-stack";
import { CarouselDots } from "~/components/carousel-dots";
import {
  BackButton,
  CompleteButton,
  ContinueButton,
  Footer,
  NavigationButtonsContainer,
} from "./styles";
import { Text2 } from "~/components/text";
import { colors } from "~/styles/theme";
import { formatMessage } from "~/utils/translation";
import { useUpdateSessionProgressMutation } from "~/state/content-progress";
import * as routes from "~/constants/routes";
import { messages } from "../../../../intl";

type FooterNavigationProp = NativeStackScreenProps<
  LibraryStackParamList,
  "library"
>;

interface SessionFooterProps {
  navigatePrevious(): void;
  navigateNext(): void;
  daysLength: number;
  currentDay: number;
  shouldRenderDays: boolean;
  heading?: string;
}

export const SessionFooter = ({
  navigatePrevious,
  navigateNext,
  daysLength,
  currentDay,
  shouldRenderDays,
  heading,
}: SessionFooterProps) => {
  const {
    params: { sessionId, planId },
  } = useRoute<SessionRouteProp>();
  const navigation = useNavigation<FooterNavigationProp["navigation"]>();
  const [updateSessionProgress] = useUpdateSessionProgressMutation();

  const isLastDay = daysLength - 1 === currentDay;
  const shouldDisplayBackButton = shouldRenderDays ? false : daysLength > 1;

  const onPressFinish = React.useCallback(() => {
    updateSessionProgress({
      sessionId,
      dayKey: shouldRenderDays ? `day${currentDay}` : `day0`,
      shouldMarkDayAsComplete: true,
    });

    navigation.navigate(routes.completeDay, {
      planId,
      day: currentDay,
      heading: shouldRenderDays ? undefined : heading,
    });
  }, [
    updateSessionProgress,
    sessionId,
    shouldRenderDays,
    currentDay,
    navigation,
    planId,
    heading,
  ]);

  if (isLastDay || shouldRenderDays)
    return (
      <Footer hasExtraSpace>
        <NavigationButtonsContainer>
          {shouldDisplayBackButton && (
            <BackButton onPress={navigatePrevious}>
              <Text2 color={colors.gray700}>{messages.backButton}</Text2>
            </BackButton>
          )}

          <CompleteButton
            onPress={onPressFinish}
            isFinishButton={shouldDisplayBackButton}
          >
            <Text2 color={colors.white}>
              {shouldDisplayBackButton
                ? formatMessage(messages.finishButton)
                : currentDay === 0
                ? formatMessage(messages.completeGenericButton)
                : formatMessage(messages.completeDayButton, {
                    day: currentDay,
                  })}
            </Text2>
          </CompleteButton>
        </NavigationButtonsContainer>
      </Footer>
    );

  return (
    <Footer>
      <NavigationButtonsContainer>
        <BackButton onPress={navigatePrevious}>
          <Text2 color={colors.gray700}>{messages.backButton}</Text2>
        </BackButton>

        <ContinueButton onPress={navigateNext}>
          <Text2 color={colors.white}>{messages.continueButton}</Text2>
        </ContinueButton>
      </NavigationButtonsContainer>

      <CarouselDots size={daysLength} activeIndex={currentDay} />
    </Footer>
  );
};
