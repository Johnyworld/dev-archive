import fs from "fs";

export const getFileNamesFromDirectory: (
  directory: string
) => Promise<string[]> = (directory: string) =>
  new Promise((revolve, reject) => {
    fs.readdir(directory, (err, data) => {
      if (err) {
        reject(err);
      }
      revolve(data);
    });
  });
