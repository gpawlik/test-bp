import "dotenv/config";

export default {
  expo: {
    name: "Bible Engagement Project",
    slug: "bible-engagement-project",
    owner: "assembliesofgod",
    originalFullName: "@assembliesofgod/bible-engagement-project",
    version: "0.0.1",
    orientation: "portrait",
    jsEngine: "hermes",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "org.ag.bep",
      usesAppleSignIn: true,
      bitcode: "Debug",
    },
    android: {
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "org.ag.bep",
      softwareKeyboardLayoutMode: "pan",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      firebasePrefix: process.env.FIREBASE_PREFIX,
      googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
      clientId: process.env.CLIENT_ID,
      eas: {
        projectId: "dab55046-4a2c-453e-9779-ad6ee499337d",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/dab55046-4a2c-453e-9779-ad6ee499337d",
    },
  },
};
