import { GEN_FILE_NAME } from "./utils/constants";
import { FileContent, Post } from "./types";
import {
  generateJsonFromPosts,
  getArchivePath,
  getFileContentsFromFiles,
  getFileNamesFromDirectory,
  getPostsFromFileContents
} from "./utils";

const main = async () => {
  const fileNames = await getFileNamesFromDirectory("archive");
  const fileContents: FileContent[] = await getFileContentsFromFiles(
    fileNames,
    getArchivePath
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
