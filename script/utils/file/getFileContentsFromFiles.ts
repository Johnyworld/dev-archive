import { MDFileData } from "../../types";
import { getFileContent } from "./getFileContent";

export const getFileContentsFromFiles = async (
  fileNames: string[],
  generatePath: (fileName: string) => string
): Promise<MDFileData[]> => {
  return await Promise.all([
    ...fileNames.map((fileName) =>
      getFileContent(fileName, generatePath(fileName))
    )
  ]);
};
