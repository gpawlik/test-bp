import * as React from "react";
import {
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ModalHeader } from "~/components/modal-header";
import { useAppDispatch, useAppSelector } from "~/state/hooks";
import {
  getOrderedBooks,
  getCurrentBook,
  getCurrentChapter,
} from "~/state/bible/selectors";
import { setCurrentChapter } from "~/state/bible/slice";

import {
  Container,
  BookIem,
  BookText,
  BookItemIcon,
  ChaptersBox,
  ChapterItem,
  ChapterText,
} from "./styles";
import { messages } from "./intl";

export const BooksModal = React.memo(() => {
  const cachedBookId = useAppSelector(getCurrentBook);
  const cachedChapterId = useAppSelector(getCurrentChapter);

  const [currentBook, setCurrentBook] = React.useState(cachedBookId);
  const [selectedBook, setSelectedBook] = React.useState("");
  const [selectedChapter, setSelectedChapter] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const scrollRef = React.useRef<null | ScrollView>();

  const books = useAppSelector(getOrderedBooks);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onClose = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDone = React.useCallback(
    (bookId?: string, chapterId?: number) => {
      dispatch(
        setCurrentChapter({
          bookId: bookId || selectedBook,
          chapterId: chapterId || selectedChapter,
        })
      );
      navigation.goBack();
    },
    [selectedBook, selectedChapter, dispatch, navigation]
  );

  const scrollToPosition = (y: number) => scrollRef.current?.scrollTo({ y });

  const highlightedBook = selectedBook || currentBook;
  const highlightedChapter = selectedChapter || cachedChapterId;

  return (
    <>
      <ModalHeader
        title={messages.title}
        onLeftPress={onClose}
        onRightPress={onDone}
        hasSeparator
      />
      <Container ref={scrollRef}>
        {books.map(({ bookId, name, chapterCount = 0 }, i) => {
          const isCurrentBook = bookId === currentBook;
          const isSelectedBook = bookId === highlightedBook;
          return (
            <View
              key={bookId}
              onLayout={(event: LayoutChangeEvent) => {
                const layout = event.nativeEvent.layout;

                if (isSelectedBook) {
                  scrollToPosition(layout.y);
                }
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedBook(bookId);
                  setIsExpanded(!isExpanded);
                }}
              >
                <BookIem isActive={isSelectedBook}>
                  <BookText>{name}</BookText>
                  <BookItemIcon isExpanded={isExpanded} />
                </BookIem>
              </TouchableOpacity>
              {isExpanded && isSelectedBook ? (
                <ChaptersBox>
                  {Array(chapterCount - 1)
                    .fill(true)
                    .map((_, index) => {
                      const chapterId = index + 1;
                      const isChapterActive =
                        highlightedChapter === chapterId && isCurrentBook;
                      return (
                        <ChapterItem
                          key={chapterId}
                          onPress={() => {
                            setCurrentBook(bookId);
                            setSelectedChapter(chapterId);
                            onDone(bookId, chapterId);
                          }}
                          isActive={isChapterActive}
                        >
                          <ChapterText
                            isActive={isChapterActive}
                          >{`${chapterId}`}</ChapterText>
                        </ChapterItem>
                      );
                    })}
                </ChaptersBox>
              ) : null}
            </View>
          );
        })}
      </Container>
    </>
  );
});
