import { getColorSchemeType, HeaderColorSchemes } from "~/utils/theme";
import { messages } from "./intl";

export interface Greeting {
  title: MessageDescriptor;
  phrase: MessageDescriptor;
}

export function getGreeting(): Greeting {
  const colorSchemeType = getColorSchemeType();

  if (colorSchemeType === HeaderColorSchemes.Morning) {
    return {
      title: messages.greetingsMorningTitle,
      phrase: messages.greetingsMorningPhrase,
    };
  }

  if (colorSchemeType === HeaderColorSchemes.Afternoon) {
    return {
      title: messages.greetingsAfternoonTitle,
      phrase: messages.greetingsAfternoonPhrase,
    };
  }

  return {
    title: messages.greetingsEveningTitle,
    phrase: messages.greetingsEveningPhrase,
  };
}
