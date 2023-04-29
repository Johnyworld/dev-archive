import fs from "fs";
import { FileContent } from "../../types";

export const getFileContent = (
  fileName: string,
  filePath: string
): Promise<FileContent> =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, fileContent) => {
      if (err) {
        reject(err);
      }
      resolve({ fileName, fileContent });
    });
  });
