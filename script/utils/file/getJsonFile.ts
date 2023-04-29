import fs from "fs";
import { Post } from "../../types";

const getJsonFile: (filePath: string) => Promise<Post[]> = (filePath: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });

export default getJsonFile;
