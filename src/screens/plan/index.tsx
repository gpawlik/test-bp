import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ActivityIndicator } from "react-native-paper";

import { LibraryStackParamList } from "~/navigation/library-stack";
import * as routes from "~/constants/routes";
import { useAppSelector } from "~/state/hooks";
import {
  getPlanById,
  getVolumesByPlanId,
  getPlanDaysCount,
  getSessionsDaysLength,
  getPlanCover,
} from "~/state/flamelink/selectors";
import {
  useAddSessionProgressMutation,
  useGetProgressByPlanQuery,
} from "~/state/content-progress";
import { Loader } from "~/components/loader";
import { GenericError } from "~/components/generic-error";
import { formatMessage } from "~/utils/translation";
import {
  PlanCoverImage,
  PlanCoverImagePlaceholder,
  PlanProgress,
  PlanTitle,
  VolumeSection,
  VolumesScrollView,
  Content,
} from "./styles";
import { PlanBackButton } from "./components/back-button";
import { PlanMainButton } from "./components/main-button";
import { messages } from "./intl";
import { getHierarchyIndexes } from "./utils";
import { VolumeSessions } from "./components/volume-sessions";
import { EmptyPlan } from "./components/empty-plan";

type PlanProps = NativeStackScreenProps<LibraryStackParamList, "plan">;

export interface OnPressSessionParams {
  sessionId: string;
  volumeIndex: number;
  sessionIndex: number;
  dayIndex: number;
}

export const Plan: React.FC<PlanProps> = ({ navigation, route }) => {
  const { planId } = route.params;

  const planData = useAppSelector((state) => getPlanById(state, planId));
  const planVolumes = useAppSelector((state) =>
    getVolumesByPlanId(state, planId)
  );
  const sessionDaysLength = useAppSelector(getSessionsDaysLength);
  const planCover = useAppSelector((state) => getPlanCover(state, planId));
  const planTitle = planData?.title || "";
  const isEmpty = !planVolumes?.length;

  const {
    data: progressData,
    isLoading: progressLoading,
    error: progressError,
  } = useGetProgressByPlanQuery(planId);

  const [addSessionProgress] = useAddSessionProgressMutation();

  const totalSessions = useAppSelector((state) =>
    getPlanDaysCount(state, planId)
  );

  const onPressSession = React.useCallback(
    (params: OnPressSessionParams) =>
      navigation.navigate(routes.session, {
        planId,
        ...params,
      }),
    [navigation, planId]
  );

  const onMainButtonPress = React.useCallback(async () => {
    if (planVolumes) {
      if (progressData?.currentSessionInProgress) {
        const { volumeIndex, sessionIndex, dayIndex } = getHierarchyIndexes(
          planVolumes,
          progressData.currentSessionInProgress
        );

        onPressSession({
          sessionId: progressData.currentSessionInProgress.sessionId,
          volumeIndex,
          sessionIndex,
          dayIndex,
        });

        return;
      }

      // Starts in the very first session of the volumes by default
      const sessionId = planVolumes[0].sessions[0];
      onPressSession({
        sessionId,
        volumeIndex: 0,
        sessionIndex: 0,
        dayIndex: 0,
      });

      await addSessionProgress({
        planId,
        volumeId: planVolumes[0].id,
        sessionId,
        totalDays: sessionDaysLength[sessionId],
      });
    }
  }, [
    addSessionProgress,
    onPressSession,
    planVolumes,
    planId,
    sessionDaysLength,
    progressData?.currentSessionInProgress,
  ]);

  const opacity = useSharedValue(1);
  const loadingImageStyles = useAnimatedStyle(
    () => ({ opacity: opacity.value }),
    [opacity]
  );

  const onLoad = React.useCallback(() => {
    opacity.value = withTiming(0, { duration: 1000 });
  }, [opacity]);

  if (progressLoading || !planData || !progressData)
    return <Loader fullScreen />;

  if (progressError) return <GenericError />;

  return (
    <Content>
      {planCover && (
        <>
          <PlanCoverImagePlaceholder style={loadingImageStyles}>
            <ActivityIndicator />
          </PlanCoverImagePlaceholder>

          <PlanCoverImage source={{ uri: planCover }} onLoad={onLoad} />
        </>
      )}

      <PlanBackButton />

      <PlanTitle>{planTitle}</PlanTitle>

      {isEmpty && <EmptyPlan />}

      {!isEmpty && (
        <>
          <PlanProgress>
            {formatMessage(messages.planProgress, {
              progressIndex: progressData.numberOfDaysCompleted,
              totalSessions,
            })}
          </PlanProgress>

          {progressData.shouldDisplayMainButton && (
            <PlanMainButton
              onPress={onMainButtonPress}
              type={progressData.currentSessionInProgress ? "resume" : "start"}
            />
          )}

          <VolumesScrollView>
            {planVolumes?.map((volume, volumeIndex) => (
              <VolumeSection
                title={formatMessage(messages.volumeTitle, {
                  volumeIndex: volumeIndex + 1,
                  volumeTitle: volume.title,
                })}
                key={`volume-${volumeIndex}`}
              >
                <VolumeSessions
                  sessions={volume.sessions}
                  planId={planId}
                  volumeId={volume.id}
                  volumeIndex={volumeIndex}
                  progressData={progressData.planProgress}
                  onPressSession={onPressSession}
                />
              </VolumeSection>
            ))}
          </VolumesScrollView>
        </>
      )}
    </Content>
  );
};
