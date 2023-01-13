import React from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ThemeProvider } from "styled-components/native";
import { Provider as StoreProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

import { Navigation } from "~/navigation";
import { store, persistor } from "~/state/store";
import { theme, paperTheme } from "~/styles/theme";
import { SplashScreen } from "~/components/splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SplashScreen>
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <PaperProvider theme={paperTheme}>
                <ActionSheetProvider>
                  <BottomSheetModalProvider>
                    <Navigation />
                  </BottomSheetModalProvider>
                </ActionSheetProvider>
              </PaperProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </SplashScreen>
      </PersistGate>
    </StoreProvider>
  );
}
