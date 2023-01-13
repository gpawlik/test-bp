import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { App } from "./src/App";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core",
  "Remote debugger",
]);

registerRootComponent(App);
