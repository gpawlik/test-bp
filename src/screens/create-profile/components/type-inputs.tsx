import * as React from "react";

import { AccountType } from "~/state/user/types";
import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";

import { messages } from "../intl";
import { TypeData } from "../types";
import {
  Container,
  Content,
  TypeContainer,
  TypeBox,
  TypeIcon,
  TypeText,
  DescriptionContainer,
  Description,
  ButtonWrapper,
  ButtonBox,
} from "../styles";
import { IconTypes } from "~/components/icon";

interface Props {
  onPress: (data: TypeData) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  accountType?: AccountType;
}

export const TypeInputs = React.memo<Props>(
  ({ onPress, onSubmit, onBackPress, accountType }) => {
    const isIndividual = accountType === AccountType.Individual;
    const isChurch = accountType === AccountType.Church;
    const description = isIndividual
      ? messages.descriptionIndividual
      : messages.descriptionChurch;

    return (
      <>
        <Container>
          <Content>
            <TypeContainer>
              <TypeBox
                onPress={() => onPress({ accountType: AccountType.Individual })}
                isActive={isIndividual}
              >
                <TypeIcon type={IconTypes.User} isActive={isIndividual} />
                <TypeText isActive={isIndividual}>
                  {messages.accountIndividual}
                </TypeText>
              </TypeBox>
              <TypeBox
                onPress={() => onPress({ accountType: AccountType.Church })}
                isActive={isChurch}
                isLast
              >
                <TypeIcon type={IconTypes.Church} isActive={isChurch} />
                <TypeText isActive={isChurch}>
                  {messages.accountChurch}
                </TypeText>
              </TypeBox>
            </TypeContainer>
            {accountType ? (
              <DescriptionContainer>
                <Description>{description}</Description>
              </DescriptionContainer>
            ) : null}
          </Content>
        </Container>

        <ButtonWrapper>
          <ButtonBox>
            <Button
              text={messages.buttonPrevious}
              onPress={onBackPress}
              type={ButtonTypes.Outlined}
            />
          </ButtonBox>
          <ButtonBox isLast>
            <Button
              text={messages.buttonNext}
              onPress={onSubmit}
              type={ButtonTypes.Primary}
              isDisabled={!accountType}
            />
          </ButtonBox>
        </ButtonWrapper>
      </>
    );
  }
);
