// We can use this function to log errors to a service like Sentry/Crashlytics
export function logError(error: any) {
  if (__DEV__) {
    console.log({ error });
  }
}
