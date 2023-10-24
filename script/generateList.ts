import { GEN_FILE_NAME, MD_FILES_PATH } from "./utils/constants";
import { MDFileData } from "./types";
import {
  generateJsonFromPosts,
  getMDFilesData,
  getFileNamesFromDirectory
} from "./utils/file";
import { getPostsFromFileContents } from "./utils/post";

const main = async () => {
  const fileNames = await getFileNamesFromDirectory(MD_FILES_PATH);
  const fileContents: MDFileData[] = await getMDFilesData(
    fileNames,
    fileName => `${MD_FILES_PATH}/${fileName}`
  );
  const posts = await getPostsFromFileContents(fileContents);
  generateJsonFromPosts(posts, GEN_FILE_NAME);
  showLogs();
};

const showLogs = () => {
  console.log("---");
  console.log("➕: 통과");
  console.log("🚧: 제목이 없습니다. 파일명으로 대체합니다.");
  console.log("❌: 날짜가 없습니다. 리스트에서 제외합니다.");
  console.log("---");
};

main();
