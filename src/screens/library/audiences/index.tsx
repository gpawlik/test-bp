import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as routes from "~/constants/routes";
import { getSortedAudiences } from "~/state/flamelink/selectors";
import { useAppSelector } from "~/state/hooks";
import { LibraryProps } from "..";
import { AudienceContainer, AudienceTitle, PlansContainer } from "./styles";
import { Plan } from "./components/plan";
import { SafeScrollView } from "~/components/safe-scroll-view";

export function Audiences() {
  const navigation = useNavigation<LibraryProps["navigation"]>();
  const audiences = useAppSelector(getSortedAudiences);

  const onPlanPress = React.useCallback(
    (planId: string) => navigation.navigate(routes.plan, { planId }),
    [navigation]
  );

  return (
    <SafeScrollView showsVerticalScrollIndicator={false}>
      {audiences.map((audience, i) => (
        <AudienceContainer key={`audience-container-${i}`}>
          <AudienceTitle>{audience.title}</AudienceTitle>

          <PlansContainer>
            {audience.plans.map((plan) => (
              <Plan
                key={`${plan}`}
                planId={plan}
                onPress={() => onPlanPress(plan)}
              />
            ))}
          </PlansContainer>
        </AudienceContainer>
      ))}
    </SafeScrollView>
  );
}
