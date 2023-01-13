import * as FileSystem from "expo-file-system";

export const BIBLE_DIRECTORY = FileSystem.documentDirectory + "bep/bibles";

export const FS_OPTIONS = { encoding: FileSystem.EncodingType.UTF8 };

export const SUPPORTED_BIBLE_VERSIONS = ["NASB", "engKJVCPB", "NVI-S"];
