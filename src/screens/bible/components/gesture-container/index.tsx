import * as React from "react";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

interface Props {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

export const GestureContainer = React.memo<Props>(
  ({ onSwipeLeft, onSwipeRight, children }) => {
    return (
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            onSwipeRight();
          }
        }}
      >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              onSwipeLeft();
            }
          }}
        >
          {children}
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
);
