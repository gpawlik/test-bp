export const isValidEmail = (string: string) =>
  !!string.match(
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/
  );

export const isValidString = (string: string, minCharacters: number = 0) =>
  string.length >= minCharacters;

export const getVerseArray = (verseNumbers: string[]): string[] => {
  const [fromVerse, toVerse] = verseNumbers;

  if (!fromVerse) {
    return [];
  }
  if (!toVerse) {
    return [fromVerse];
  }

  const from = Number(fromVerse) || 0;
  const to = Number(toVerse) || 0;
  const verseCount = Math.abs(to - from + 1);

  return Array(verseCount)
    .fill(0)
    .map((_, i) => `${from + i}`);
};

export const getScriptureData = (scripture: string = "") => {
  const chunks = scripture.split(":");
  const bookChapterChunk = chunks[0];
  const verseChunk = chunks[1];

  const bcChunks = bookChapterChunk.split(" ");
  const chapter = Number(bcChunks.pop()) || 0;
  const bookName = bcChunks.join(" ");

  const verseNumbers = verseChunk?.match(/\d+/g) || [];
  const verses = getVerseArray(verseNumbers);

  return {
    bookName,
    chapter,
    verses,
  };
};
