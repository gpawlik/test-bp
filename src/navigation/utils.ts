export function formatDocumentTitle(title?: string, name?: string) {
  const titleToUse = title || name;

  const isTab = titleToUse && titleToUse?.match(/^[a-z']+\.[a-z']+$/);

  if (isTab) {
    const [tabName] = titleToUse.split(".");

    return capitalizeFirstLetter(tabName);
  }

  return capitalizeFirstLetter(titleToUse);
}

function capitalizeFirstLetter(text?: string) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}
