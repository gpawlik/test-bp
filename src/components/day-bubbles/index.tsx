import React from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "~/navigation/post-auth";
import * as routes from "~/constants/routes";
import { CarouselDots } from "../carousel-dots";
import {
  BubbleBody,
  BubbleContent,
  BubbleSeparator,
  BubbleTitle,
  CarouselDotsContainer,
  flatListStyles,
  NeutralCircle,
  NeutralCircleContainer,
  bubbleShadow,
  OnlyText,
  OnlyTextWrapper,
} from "./styles";
import { BubbleItem } from "./types";
import { CIRCLE_SIZE } from "./constants";
import { isWeb } from "~/utils/platform";
import { useGetProgressBySessionQuery } from "~/state/content-progress";
import { getRandomArbitrary, mapBubblesBySessionId } from "./utils";
import { BubbleHandler } from "./components/bubble-handler";

export type HomeProps = NativeStackScreenProps<TabParamList, "home.tab">;

interface DayBubblesProps {
  sessionId: string;
}

export function DayBubbles({ sessionId }: DayBubblesProps) {
  const navigation = useNavigation<HomeProps["navigation"]>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatlistRef = React.useRef<FlatList>(null);

  const { data: progressData } = useGetProgressBySessionQuery(sessionId, {
    skip: !sessionId,
  });

  const bubbles = React.useMemo(
    () => mapBubblesBySessionId(progressData),
    [progressData]
  );

  const handleDayBubblePress = React.useCallback(
    (dayIndex: number) => {
      navigation.navigate(routes.libraryTab, {
        screen: routes.session,
        params: {
          sessionId,
          planId: progressData?.planId ?? "",
          volumeIndex: 0,
          sessionIndex: 0,
          dayIndex,
        },
        initial: false,
      });
    },
    [navigation, progressData?.planId, sessionId]
  );

  const onScrollToIndex = React.useCallback(() => {
    // focuses on the first bubble in progress, if there is one
    const scrollToTimeout = setTimeout(() => {
      const firstInProgressIndex = bubbles.findIndex(
        (bubble) => bubble.type === "in-progress"
      );

      if (firstInProgressIndex !== -1) {
        setActiveIndex(firstInProgressIndex);

        flatlistRef?.current?.scrollToIndex({
          index: firstInProgressIndex,
          animated: true,
        });
      }
    }, 1000);

    return () => clearTimeout(scrollToTimeout);
  }, [bubbles]);

  React.useEffect(() => {
    onScrollToIndex();
  }, [onScrollToIndex]);

  const renderItem = React.useMemo(
    () =>
      (
        item: BubbleItem,
        index: number
      ): React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
        switch (item.type) {
          case "only-text":
            return (
              <OnlyTextWrapper>
                {item.body && <OnlyText>{item.body}</OnlyText>}
              </OnlyTextWrapper>
            );
          case "neutral":
            return (
              <NeutralCircleContainer key={item.id}>
                <NeutralCircle style={bubbleShadow}>
                  {item.title && (
                    <TouchableOpacity>
                      <BubbleTitle>{`${item.title}`}</BubbleTitle>
                    </TouchableOpacity>
                  )}

                  {item.title && item.body && <BubbleSeparator />}

                  {item.body && <BubbleBody>{item.body}</BubbleBody>}
                </NeutralCircle>
              </NeutralCircleContainer>
            );
          case "completed":
          case "in-progress":
          case "not-started":
            return (
              <React.Fragment key={item.id}>
                <BubbleContent>
                  {item.title && (
                    <TouchableOpacity
                      onPress={() => handleDayBubblePress(item.id)}
                    >
                      <BubbleTitle
                        bubbleType={item.type}
                      >{`${item.title}`}</BubbleTitle>
                    </TouchableOpacity>
                  )}

                  {item.title && item.body && (
                    <BubbleSeparator bubbleType={item.type} />
                  )}

                  {item.body && (
                    <BubbleBody bubbleType={item.type}>{item.body}</BubbleBody>
                  )}
                </BubbleContent>

                <BubbleHandler
                  key={`day-bubble-${index}`}
                  bubbleType={item.type}
                  style={isWeb ? {} : bubbleShadow}
                  // this is in order to stagger the animations
                  animationRandomStartTime={getRandomArbitrary(0, 4000)}
                />
              </React.Fragment>
            );

          default:
            return <View />;
        }
      },
    [handleDayBubblePress]
  );

  const onScrollEndDrag = React.useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const position = nativeEvent.contentOffset;
      const index = Math.round(position.x / CIRCLE_SIZE);

      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );

  if (!bubbles.length) return null;

  return (
    <>
      <FlatList
        horizontal
        scrollEventThrottle={CIRCLE_SIZE}
        onScrollEndDrag={onScrollEndDrag}
        showsHorizontalScrollIndicator={false}
        data={bubbles}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => renderItem(item, index)}
        contentContainerStyle={flatListStyles}
        ref={flatlistRef}
        onScrollToIndexFailed={onScrollToIndex}
      />

      <CarouselDotsContainer>
        <CarouselDots size={bubbles.length - 2} activeIndex={activeIndex} />
      </CarouselDotsContainer>
    </>
  );
}
