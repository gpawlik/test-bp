import React from "react";

import { messages } from "./intl";
import {
  Container,
  Content,
  StepBox,
  StepCircle,
  StepIcon,
  StepLineBox,
  StepLine,
  StepNumber,
} from "./styles";

const data = [
  { id: 0, text: messages.step1 },
  { id: 1, text: messages.step2 },
  { id: 2, text: messages.step3 },
  { id: 3, text: messages.step4 },
];

interface Props {
  step: number;
}

export const Steps = React.memo<Props>(({ step }) => {
  return (
    <Container>
      {data.map(({ id, text }) => {
        const isFirst = id === 0;
        const isLast = id === data.length - 1;
        const isActive = step >= id;
        const isPreviousActive = step > id;
        return (
          <Content key={id}>
            <StepLineBox>
              <StepLine isActive={isActive} isShown={!isFirst} />
            </StepLineBox>
            <StepBox>
              <StepCircle isActive={isActive} isChecked={isPreviousActive}>
                {!isPreviousActive ? (
                  <StepNumber isActive={isActive}>{`${id + 1}`}</StepNumber>
                ) : (
                  <StepIcon
                    name="check"
                    size={20}
                    isActive={isActive}
                    isChecked={isPreviousActive}
                  />
                )}
              </StepCircle>
            </StepBox>
            <StepLineBox>
              <StepLine isActive={isPreviousActive} isShown={!isLast} />
            </StepLineBox>
          </Content>
        );
      })}
    </Container>
  );
});
