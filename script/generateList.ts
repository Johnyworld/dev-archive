import { GEN_FILE_NAME, MD_FILES_PATH } from "./utils/constants";
import { MDFileData } from "./types";
import {
  generateJsonFromPosts,
  getMDFilesData,
  getFileNamesFromDirectory
} from "./utils/file";
import { parseMDFilesDataToPosts } from "./utils/post";

const main = async () => {
  const fileNames = await getFileNamesFromDirectory(MD_FILES_PATH);
  const fileContents: MDFileData[] = await getMDFilesData(
    fileNames,
    fileName => `${MD_FILES_PATH}/${fileName}`
  );
  const posts = await parseMDFilesDataToPosts(fileContents);
  generateJsonFromPosts(posts, GEN_FILE_NAME);
};

main();
