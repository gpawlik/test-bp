import * as React from "react";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native";

import { useAppDispatch } from "~/state/hooks";
import { getFullBible, removeBibleData } from "~/state/bible/actions";
import { BIBLE_DIRECTORY } from "~/constants";

interface Props {
  abbreviation: string;
  abbreviationLocal?: string;
  name: string;
  isActive: boolean;
  onPress: (arg0: string) => void;
  isMock?: boolean;
}

import {
  Item,
  IconBox,
  TextBox,
  DownloadButton,
  Title,
  Description,
  CheckIcon,
  DownloadIcon,
} from "./styles";

export const BibleItem = React.memo<Props>(
  ({ abbreviation, abbreviationLocal, name, isActive, onPress, isMock }) => {
    const [isDownloaded, setIsDownloaded] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useAppDispatch();

    const booksUri = `${BIBLE_DIRECTORY}/${abbreviation}/books.json`;

    React.useEffect(() => {
      FileSystem.getInfoAsync(booksUri)
        .then(({ exists }) => {
          setIsDownloaded(exists);
        })
        .catch(console.log);
    }, []);

    const onDownload = React.useCallback(
      (bibleId: string) => {
        setIsLoading(true);
        dispatch(
          getFullBible({
            bibleId,
            onSuccess: () => {
              setIsDownloaded(true);
              setIsLoading(false);
            },
            onError: () => setIsLoading(false),
          })
        );
      },
      [dispatch]
    );

    const onRemove = React.useCallback(
      (bibleId: string) => {
        setIsLoading(true);
        dispatch(
          removeBibleData({
            bibleId,
            onSuccess: () => {
              setIsDownloaded(false);
              setIsLoading(false);
            },
            onError: () => setIsLoading(false),
          })
        );
      },
      [dispatch]
    );

    const onAction = React.useCallback(
      (bibleId: string) => {
        if (isMock) {
          onPress(bibleId);
          return;
        }
        isDownloaded ? onRemove(bibleId) : onDownload(bibleId);
      },
      [isDownloaded, isMock]
    );

    return (
      <Item isActive={isActive}>
        <IconBox isActive={isActive}>{isActive ? <CheckIcon /> : null}</IconBox>
        <TextBox onPress={() => onPress(abbreviation)}>
          <Title>{abbreviationLocal || abbreviation}</Title>
          <Description>{name}</Description>
        </TextBox>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <DownloadButton onPress={() => onAction(abbreviation)}>
            <DownloadIcon isDownloaded={isDownloaded} />
          </DownloadButton>
        )}
      </Item>
    );
  }
);
