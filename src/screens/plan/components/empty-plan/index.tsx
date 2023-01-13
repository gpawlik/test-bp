import React from "react";
import { EmptyGroupImage } from "~/components/empty-group/group-image";
import { messages } from "./intl";
import { Container, Content, Description, Title } from "./styles";

export const EmptyPlan: React.FC = () => {
  return (
    <Container>
      <Content>
        <EmptyGroupImage />

        <Title>{messages.emptyPlanTitle}</Title>

        <Description>{messages.emptyPlanDescription}</Description>
      </Content>
    </Container>
  );
};
