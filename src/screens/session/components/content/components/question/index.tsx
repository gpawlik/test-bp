import * as React from "react";
import { Keyboard } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IconSizes } from "~/components/icon";
import { messages } from "~/screens/session/intl";
import { colors } from "~/styles/theme";
import { formatMessage } from "~/utils/translation";
import { Question as QuestionType } from "~/state/flamelink";
import { isWeb } from "~/utils/platform";
import { useGetSessionNoteByKeyQuery } from "~/state/session-notes";
import type { SessionRouteProp } from "~/screens/session/types";
import {
  AnswerActionContainer,
  AnswerActionText,
  QuestionContainer,
  QuestionGradientSeparator,
  QuestionText,
  QuestionTextWrapper,
  QuestionTitle,
  webModalContainerStyles,
} from "./styles";
import { Answer } from "../answer";

interface QuestionProps {
  question: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const {
    params: { sessionId },
  } = useRoute<SessionRouteProp>();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["70%"], []);
  const [visible, setVisible] = React.useState(false);

  const { data } = useGetSessionNoteByKeyQuery({
    sessionId,
    noteKey: question.uniqueKey,
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePresentModalPress = React.useCallback(() => {
    isWeb ? showModal() : bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = React.useCallback(() => {
    isWeb ? hideModal() : bottomSheetModalRef.current?.dismiss();

    Keyboard.dismiss();
  }, []);

  return (
    <>
      <QuestionContainer>
        <QuestionTitle>{formatMessage(messages.question)}</QuestionTitle>
        <QuestionTextWrapper>
          <QuestionGradientSeparator />

          <QuestionText>{question.question}</QuestionText>
        </QuestionTextWrapper>

        <AnswerActionContainer onPress={handlePresentModalPress}>
          <Icon
            name={data ? "remove-red-eye" : "edit"}
            color={colors.primaryBlue}
            size={IconSizes.SMedium}
          />

          <AnswerActionText>
            {data
              ? formatMessage(messages.viewAnswer)
              : formatMessage(messages.answerQuestion)}
          </AnswerActionText>
        </AnswerActionContainer>
      </QuestionContainer>

      {isWeb ? (
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={webModalContainerStyles}
          >
            <Answer
              question={question}
              onClose={handleCloseModal}
              sessionId={sessionId}
              answer={data?.note}
            />
          </Modal>
        </Portal>
      ) : (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <Answer
            question={question}
            onClose={handleCloseModal}
            sessionId={sessionId}
            answer={data?.note}
          />
        </BottomSheetModal>
      )}
    </>
  );
};
