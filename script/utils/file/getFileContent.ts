import fs from "fs";
import { MDFileData } from "../../types";

export const getFileContent = (
  fileName: string,
  filePath: string
): Promise<MDFileData> =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, fileContent) => {
      if (err) {
        reject(err);
      }
      resolve({ fileName, fileContent });
    });
  });
