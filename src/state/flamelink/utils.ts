const baseStorageUrl =
  "https://firebasestorage.googleapis.com/v0/b/bep-rc.appspot.com/o/";
const mediaFolder = "flamelink/media/sized/";

export enum MediaSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  ExtraLarge = "ExtraLarge",
}

const getSizePath = (size?: MediaSize) => {
  switch (size) {
    case MediaSize.Small:
      return "667_9999_100/";
    case MediaSize.Medium:
      return "900_9999_100/";
    case MediaSize.Large:
      return "1440_9999_100/";
    case MediaSize.ExtraLarge:
      return "1920_9999_100/";
    default:
      return "900_9999_100/";
  }
};

export const makeMediaUrl = (mediaPath: string, size?: MediaSize) =>
  `${baseStorageUrl}${encodeURIComponent(
    `${mediaFolder}${getSizePath(size)}${mediaPath}`
  )}?alt=media`;
