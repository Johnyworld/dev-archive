import fs from 'fs';
import { MDFileData } from "../../types";

export const getMDFilesData = async (
  fileNames: string[],
  generatePath: (fileName: string) => string
): Promise<MDFileData[]> => {
  return await Promise.all([
    ...fileNames.map((fileName) =>
      getMDFileData(fileName, generatePath(fileName))
    )
  ]);
};

const getMDFileData = (fileName: string, filePath: string): Promise<MDFileData> =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
      if (err) {
        reject(err);
      }
      resolve({ fileName, fileContent });
    });
  });

