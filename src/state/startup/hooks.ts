import * as React from "react";
import * as Font from "expo-font";

import { useAppDispatch } from "~/state/hooks";
import { resourcesFinishedLoading } from "~/state/startup";

// We can use this hook to pre-load any kind of resources
export const useLoadResources = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Lora: require("../../../assets/fonts/Lora.ttf"),
          LoraItalic: require("../../../assets/fonts/Lora-Italic.ttf"),
          // This is a variation of Lora font with a custom position of the number characters
          LoraSuperscript: require("../../../assets/fonts/LoraSuperscript.ttf"),
          Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
          MontserratLight: require("../../../assets/fonts/Montserrat-Light.ttf"),
          MontserratMedium: require("../../../assets/fonts/Montserrat-Medium.ttf"),
          MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
          Roboto: require("../../../assets/fonts/Roboto.ttf"),
          SFCompact: require("../../../assets/fonts/SF-Compact.ttf"),
          SFPro: require("../../../assets/fonts/SF-Pro.ttf"),
          SFProText: require("../../../assets/fonts/SF-Pro-Text.ttf"),
          SFProDisplay: require("../../../assets/fonts/SF-Pro-Display.ttf"),
          SFProDisplayMedium: require("../../../assets/fonts/SF-Pro-Display-Medium.ttf"),
          SFProDisplayBold: require("../../../assets/fonts/SF-Pro-Display-Bold.ttf"),
          SFProDisplayItalic: require("../../../assets/fonts/SF-Pro-Display-Italic.ttf"),
          // workaround to load icons for Android using a monorepo https://github.com/expo/expo/issues/5566
          MaterialIcons: require("../../../assets/fonts/MaterialIcons.ttf"),
          MaterialCommunityIcons: require("../../../assets/fonts/MaterialCommunityIcons.ttf"),
        });
      } catch (e) {
      } finally {
        dispatch(resourcesFinishedLoading());
      }
    }

    loadResourcesAndDataAsync();
  }, []);
};
