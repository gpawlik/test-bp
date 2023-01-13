import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "<config>/firebase";
import type { FlamelinkMediaFile } from "./types";

const filesCollection = "fl_files";

export async function getFlamelinkMedia(
  chunkedFilesIds: string[][]
): Promise<FlamelinkMediaFile[]> {
  const filesRefs = chunkedFilesIds.map((coverIds) =>
    query(
      collection(database, filesCollection),
      where(documentId(), "in", coverIds)
    )
  );

  const filesQueries = filesRefs.map((ref) => getDocs(ref));

  const coverFilesResult = await Promise.all(filesQueries).then((results) =>
    results.map((result) => result.docs.map((data) => data.data()))
  );

  const files = [...coverFilesResult.flat()].map((cover) => ({
    id: cover.id,
    file: cover.file,
  }));

  return files;
}
