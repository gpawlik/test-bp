import * as React from "react";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BibleHeader } from "~/components/bible-header";
import { Screen } from "~/components/screen";
import { colors } from "~/styles/theme";
import { hexToRGB } from "~/utils/colors";
import { getScriptureData } from "~/utils/strings";
import { useAppDispatch, useAppSelector } from "~/state/hooks";
import { getChapters } from "~/state/bible/actions";
import { setCurrentChapter } from "~/state/bible/slice";
import {
  getBibleAbbreviation,
  getCurrentBookName,
  getBookIdByName,
  getCurrentChaptersOrdered,
  getCurrentBook,
  getCurrentChapter,
} from "~/state/bible/selectors";

import { Header } from "./components/header";
import { Content as ChapterContent } from "./components/content";
import { Arrow } from "./components/arrow";
import { GestureContainer } from "./components/gesture-container";
import {
  Container,
  Content,
  Shadow,
  CenteredBox,
  ErrorBox,
  ErrorText,
} from "./styles";
import { BibleStackParamList } from "~/navigation/bible-stack";
import { messages } from "./intl";

const THRESHOLD = 100;

type Props = NativeStackScreenProps<BibleStackParamList, "bible">;

export const Bible = gestureHandlerRootHOC(({ route }: Props) => {
  const scripture = route?.params?.scripture;

  const {
    bookName: linkedBookName,
    chapter: linkedChapter,
    verses: linkedVerses,
  } = getScriptureData(scripture);

  const linkedBookId = useAppSelector((state) =>
    getBookIdByName(state, linkedBookName)
  );
  const [isCompact, setIsCompact] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef<null | ScrollView>();

  const dispatch = useAppDispatch();
  const bibleName = useAppSelector(getBibleAbbreviation);
  const bookId = useAppSelector(getCurrentBook);
  const chapterNumber = useAppSelector(getCurrentChapter);
  const bookName = useAppSelector(getCurrentBookName);
  const chapters = useAppSelector(getCurrentChaptersOrdered);

  const chapter =
    chapters.find(({ position }) => position === chapterNumber) || chapters[0];
  const verses = chapter?.verses || [];
  const chapterReference = hasError
    ? messages.select
    : chapter?.reference || "";
  const title = chapter?.title || "";
  const isLinked = linkedBookId === bookId && linkedChapter === chapterNumber;

  const previousChapter = React.useMemo(() => {
    if (!chapter?.position || chapter.position <= 1) {
      return;
    }

    return chapter.position - 1;
  }, [chapter]);

  const nextChapter = React.useMemo(() => {
    if (!chapter?.position || chapter.position >= chapters.length) {
      return;
    }

    return chapter.position + 1;
  }, [chapter, chapters]);

  const refreshData = React.useCallback(() => {
    setHasError(false);
    dispatch(getChapters({ bookId, onError: () => setHasError(true) }));
  }, [dispatch, bookId]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData, bookId]);

  // Refresh when coming from the scripture link
  React.useEffect(() => {
    if (linkedBookId && linkedChapter) {
      dispatch(
        setCurrentChapter({
          bookId: linkedBookId,
          chapterId: linkedChapter,
        })
      );
    }
  }, [dispatch, linkedBookId, linkedChapter]);

  React.useEffect(() => {
    if (chapters) {
      fadeIn();
    }
  }, [chapters]);

  const fadeIn = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

  const fadeOut = (callback: () => void) =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(callback);

  const handleScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const position = e.nativeEvent.contentOffset.y;
      if (position < THRESHOLD && isCompact) {
        setIsCompact(false);
        return;
      }
      if (position >= THRESHOLD && !isCompact) {
        setIsCompact(true);
        return;
      }
    },
    [isCompact]
  );

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0 });

  const handlePrev = () => {
    if (!previousChapter) {
      return;
    }

    fadeOut(() => {
      scrollToTop();
      fadeIn();
      dispatch(
        setCurrentChapter({
          bookId,
          chapterId: previousChapter,
        })
      );
    });
  };

  const handleNext = () => {
    if (!nextChapter) {
      return;
    }

    fadeOut(() => {
      scrollToTop();
      fadeIn();
      dispatch(
        setCurrentChapter({
          bookId,
          chapterId: nextChapter,
        })
      );
    });
  };

  const scrollToPosition = (position: number) => {
    setIsCompact(true);
    scrollRef.current?.scrollTo({
      y: position + 156,
      animated: false,
    });
  };

  return (
    <Screen>
      <CenteredBox>
        {hasError ? (
          <ErrorBox>
            <ErrorText>{messages.errorTitle}</ErrorText>
          </ErrorBox>
        ) : (
          <ActivityIndicator />
        )}
      </CenteredBox>

      <BibleHeader
        book={chapterReference}
        version={bibleName}
        isCompact={isCompact}
        scripture={scripture}
        showScripture={isLinked}
      />

      <GestureContainer onSwipeLeft={handleNext} onSwipeRight={handlePrev}>
        <Container style={[{ opacity: fadeAnim }]}>
          <Content
            onScroll={handleScroll}
            scrollEventThrottle={160}
            ref={scrollRef}
          >
            {verses.length && chapterNumber === 1 ? (
              <Header bookName={bookName} />
            ) : null}
            <ChapterContent
              title={title}
              verses={verses}
              scrollToPosition={scrollToPosition}
              highlightedVerses={isLinked ? linkedVerses : undefined}
            />
          </Content>
          <Shadow colors={[colors.gray400, hexToRGB(colors.white, 0)]} />
        </Container>
      </GestureContainer>

      {previousChapter ? <Arrow onPress={handlePrev} isLeft /> : null}
      {nextChapter ? <Arrow onPress={handleNext} /> : null}
    </Screen>
  );
});
