import * as React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ModalHeader } from "~/components/modal-header";
import { useAppDispatch, useAppSelector } from "~/state/hooks";
import { getCurrentBible, getBibles } from "~/state/bible/selectors";
import { setCurrentBible } from "~/state/bible/slice";

import { BibleItem } from "./components/bible-item";
import { Container, SectionText } from "./styles";
import { messages } from "./intl";

// TODO: this will be replaced with real data in the future
const otherBibles = [
  {
    abbreviation: "NLT",
    name: "New Living Translation",
    lang: "en",
  },
  {
    abbreviation: "NTV",
    name: "Nueva Traducción Viviente",
    lang: "es",
  },
  {
    abbreviation: "The Message",
    name: "The Bible in Contemporary Language",
    lang: "en",
  },
  {
    abbreviation: "NIV",
    name: "New International Version",
    lang: "en",
  },
  {
    abbreviation: "NVI",
    name: "Nueva Versión Internacional",
    lang: "es",
  },
];

export const VersionModal = React.memo(() => {
  const [isLoading, setIsLoading] = React.useState(false);

  const currentBible = useAppSelector(getCurrentBible);
  const data = useAppSelector(getBibles);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onClose = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDone = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAction = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const onSelect = React.useCallback(
    (id: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      dispatch(
        setCurrentBible({ bibleId: id, onSuccess: onAction, onError: onAction })
      );
    },
    [dispatch, isLoading, onAction]
  );

  const onSelectMock = React.useCallback((id: string) => {
    Alert.alert(
      "Version not available",
      `${id} is not yet available. Please try again later.`
    );
  }, []);

  const bibles = otherBibles.filter((bible) => bible.lang === "en");

  return (
    <>
      <ModalHeader
        title={messages.title}
        onLeftPress={onClose}
        onRightPress={onDone}
        hasSeparator
      />
      <Container>
        <SectionText>{messages.recent}</SectionText>
        {data.map(({ abbreviation, abbreviationLocal, name }) => {
          const isActive = abbreviation === currentBible;
          return (
            <BibleItem
              abbreviation={abbreviation}
              abbreviationLocal={abbreviationLocal}
              name={name}
              isActive={isActive}
              onPress={onSelect}
              key={abbreviation}
            />
          );
        })}
        <SectionText>{messages.other}</SectionText>
        {bibles.map(({ abbreviation, name }) => {
          return (
            <BibleItem
              abbreviation={abbreviation}
              name={name}
              isActive={false}
              onPress={onSelectMock}
              key={abbreviation}
              isMock
            />
          );
        })}
      </Container>
    </>
  );
});
