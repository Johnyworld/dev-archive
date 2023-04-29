import { FileContent } from "../../types";
import getFileContent from "./getFileContent";

const getFileContentsFromFiles = async (
  fileNames: string[],
  generatePath: (fileName: string) => string
): Promise<FileContent[]> => {
  return await Promise.all([
    ...fileNames.map((fileName) =>
      getFileContent(fileName, generatePath(fileName))
    )
  ]);
};

export default getFileContentsFromFiles;
