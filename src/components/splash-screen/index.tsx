import React from "react";
import { Animated, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "~/state/hooks";
import {
  splashScreenFinishedLoading,
  appStartedLoading,
} from "~/state/startup";
import { useLoadResources } from "~/state/startup/hooks";
import { SplashElements } from "./splash-elements";
import { SplashScreenContainer } from "./styles";

const FADE_OUT_DURATION = 1000;

interface SplashScreenProps {
  children: JSX.Element;
}

export function SplashScreen({ children }: SplashScreenProps) {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAnimationComplete, setAnimationComplete] = React.useState(false);
  const { splashScreenLoaded, isAppReady } = useAppSelector(
    (state) => state.startup
  );
  const dispatch = useAppDispatch();

  const onComplete = React.useCallback(
    () => dispatch(splashScreenFinishedLoading()),
    [dispatch]
  );

  useLoadResources();

  React.useEffect(() => {
    dispatch(appStartedLoading());
  }, []);

  React.useEffect(() => {
    if (splashScreenLoaded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: FADE_OUT_DURATION,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [splashScreenLoaded]);

  return (
    <SplashScreenContainer>
      {isAppReady && children}

      {!isAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { opacity: animation }]}
        >
          <SplashElements onComplete={onComplete} />
        </Animated.View>
      )}
    </SplashScreenContainer>
  );
}
