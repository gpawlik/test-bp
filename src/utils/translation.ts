import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import { resources } from "./resources/intl-resources";

const language = Localization.locale.split("-")[0];
const DEFAULT_LANGUAGE = "en";

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3", // Android doesn't support v4 yet
  lng: language,
  fallbackLng: DEFAULT_LANGUAGE,
  ns: ["base"],
  defaultNS: "base",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export const t = i18next.t;

export const locale = Localization.locale;

export const formatMessage = (
  message: MessageDescriptorValues,
  values?: MessageDescriptorValues["values"]
) => {
  const intlId = message.id;

  const translatedText = message.values
    ? t(intlId, message.values)
    : t(intlId, values);

  // This should only be true if extracted-messages hasn't run yet
  if (translatedText === intlId) {
    return message.defaultMessage;
  }

  return translatedText;
};

export const isIntlDescriptor = (message: TextType | undefined): boolean => {
  if (!message || typeof message !== "object") {
    return false;
  }

  const { id, defaultMessage } = message;
  return !!id && !!defaultMessage;
};

const isCurrentLangSupported = Object.keys(resources).includes(language);

export const lang = isCurrentLangSupported
  ? language
  : DEFAULT_LANGUAGE;
