import * as React from "react";
import { messages } from "~/screens/session/intl";
import { formatMessage } from "~/utils/translation";
import { Question as QuestionType } from "~/state/flamelink";
import { useAddSessionNotesMutation } from "~/state/session-notes";
import {
  AnswerButtonText,
  AnswerCancelButton,
  AnswerDivider,
  AnswerDoneButton,
  AnswerHeaderContainer,
  AnswerInput,
  AnswerQuestionContent,
  AnswerTitle,
} from "./styles";

interface AnswerProps {
  question: QuestionType;
  onClose(): void;
  sessionId: string;
  answer?: string;
}

export const Answer: React.FC<AnswerProps> = ({
  question,
  onClose,
  sessionId,
  answer,
}) => {
  const [value, onChangeText] = React.useState(answer ?? "");
  const [addSessionNotes] = useAddSessionNotesMutation();

  const handleOnSubmitEditing = React.useCallback(() => {
    addSessionNotes({
      sessionId,
      note: { key: question.uniqueKey, note: value },
    });

    onClose();
  }, [addSessionNotes, onClose, question.uniqueKey, sessionId, value]);

  return (
    <>
      <AnswerHeaderContainer>
        <AnswerCancelButton onPress={onClose}>
          <AnswerButtonText>
            {formatMessage(messages.answerCancelButton)}
          </AnswerButtonText>
        </AnswerCancelButton>

        <AnswerTitle>{formatMessage(messages.question)}</AnswerTitle>

        <AnswerDoneButton onPress={handleOnSubmitEditing}>
          <AnswerButtonText>
            {formatMessage(messages.answerDoneButton)}
          </AnswerButtonText>
        </AnswerDoneButton>
      </AnswerHeaderContainer>

      <AnswerDivider />

      <AnswerQuestionContent>{question.question}</AnswerQuestionContent>

      <AnswerDivider />

      <AnswerInput
        multiline={true}
        numberOfLines={10}
        placeholder={formatMessage(messages.answerInputPlaceholder)}
        returnKeyType="done"
        onSubmitEditing={handleOnSubmitEditing}
        autoFocus
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        // outline required to be passed inline to work for web
        style={{ outline: "none" }}
      />
    </>
  );
};
