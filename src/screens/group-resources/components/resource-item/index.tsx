import * as React from "react";

import { useAppSelector } from "~/state/hooks";
import { ProgressBar } from "~/components/progress-bar";
import {
  getPlanById,
  getVolumeById,
  getPlanDaysCount,
  getPlanThumbnail,
} from "~/state/flamelink/selectors";
import { useGetProgressByPlanQuery } from "~/state/content-progress";

import {
  Container,
  ResourceImage,
  EmptyImage,
  Content,
  TextBox,
  Category,
  Title,
  ProgressBox,
  Progress,
} from "./styles";
import { messages } from "./intl";

interface Props {
  id: string;
  onPress: () => void;
}

interface BasicProps {
  onPress: () => void;
}

export const ResourceItem = React.memo<Props>(({ id, onPress }) => {
  const { data: progressData, isLoading: progressLoading } =
    useGetProgressByPlanQuery(id);

  const planData = useAppSelector((state) => getPlanById(state, id));
  const volumeId = planData?.volumes[0] || "";
  const volumeData = useAppSelector((state) => getVolumeById(state, volumeId));
  const total = useAppSelector((state) => getPlanDaysCount(state, id));

  const image = useAppSelector((state) => getPlanThumbnail(state, id));

  const daysCompleted = progressData?.numberOfDaysCompleted || 0;
  const progress = total ? Math.round((daysCompleted / total) * 100) : 0;

  return (
    <Container onPress={onPress}>
      {image ? <ResourceImage source={{ uri: image }} /> : <EmptyImage />}
      <Content>
        <TextBox>
          {planData?.title ? <Category>{planData?.title}</Category> : null}
          {volumeData?.title ? <Title>{volumeData?.title}</Title> : null}
        </TextBox>

        {!progressLoading ? (
          <ProgressBox>
            <ProgressBar progress={progress} />
            <Progress>
              {{ ...messages.progress, values: { progress } }}
            </Progress>
          </ProgressBox>
        ) : null}
      </Content>
    </Container>
  );
});

// This component exists for demo purpose only
// It can be removed when we have real data
export const KidsResourceItem = React.memo<BasicProps>(({ onPress }) => {
  const image = require("<assets>/resources/en/learn/kids.jpg");
  const category = "Learn: Kids";
  const resourceTitle = "The Bible Is My Weapon";

  const progress = 75;

  return (
    <Container onPress={onPress}>
      {image ? <ResourceImage source={image} /> : <EmptyImage />}
      <Content>
        <TextBox>
          <Category>{category}</Category>
          <Title>{resourceTitle}</Title>
        </TextBox>

        <ProgressBox>
          <ProgressBar progress={progress} />
          <Progress>{{ ...messages.progress, values: { progress } }}</Progress>
        </ProgressBox>
      </Content>
    </Container>
  );
});
