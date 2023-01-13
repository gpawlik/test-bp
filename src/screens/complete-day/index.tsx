import * as React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "@expo/vector-icons/MaterialIcons";
import type { LibraryStackParamList } from "~/navigation/library-stack";
import { BackgroundGradient } from "~/components/background-gradient";
import * as routes from "~/constants/routes";
import { colors } from "~/styles/theme";
import { useAppSelector } from "~/state/hooks";
import { getPlanThumbnail } from "~/state/flamelink/selectors";
import {
  CompleteDayContainer,
  CheckIconContainer,
  DayCompleteHeading,
  CHECK_ICON_SIZE,
} from "./styles";
import { formatMessage } from "~/utils/translation";
import { messages } from "./intl";
import { REDIRECTION_DELAY } from "./constants";

type CompleteDayProps = NativeStackScreenProps<
  LibraryStackParamList,
  "completeDay"
>;

export const CompleteDay: React.FC<CompleteDayProps> = ({
  route,
  navigation,
}) => {
  const { planId } = route.params;
  const planThumbnail = useAppSelector((state) =>
    getPlanThumbnail(state, planId)
  );

  React.useEffect(() => {
    const redirectTimeout = setTimeout(
      () => navigation.navigate(routes.library),
      REDIRECTION_DELAY
    );

    return () => clearTimeout(redirectTimeout);
  });

  return (
    <CompleteDayContainer>
      <BackgroundGradient
        source={{ uri: planThumbnail }}
        colors={["#53FC79", "#0C6A48"]}
        imageWidth="350%"
      />

      <CheckIconContainer>
        <Icon name="check" size={CHECK_ICON_SIZE} color={colors.green600} />
      </CheckIconContainer>

      <DayCompleteHeading>
        {route.params.heading
          ? formatMessage(messages.headingDay0, {
              heading: route.params.heading,
            })
          : formatMessage(messages.heading, { day: route.params.day })}
      </DayCompleteHeading>
    </CompleteDayContainer>
  );
};
