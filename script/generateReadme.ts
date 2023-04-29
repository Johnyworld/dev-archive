import fs from "fs";
import { GEN_FILE_NAME, GEN_README_FILE_NAME } from "./utils/constants";
import { Post } from "./types";
import { getJsonFile } from "./utils/file";
import { parseCategorizedListToReadmeMarkdown } from "./utils/markdown";
import { getCategorizedPostList } from "./utils/post";

const welcome = `# 안녕하세요.

> 이곳은 개발자 김재환의 글 보관소 입니다.
> 작은 생각부터, 공들인 글까지.
> 디지털 정원으로 가꾸는 공간입니다.`;

const main = async () => {
  const posts: Post[] = await getJsonFile(GEN_FILE_NAME);
  const categorizedList = getCategorizedPostList(posts);
  const parsedMarkdown = parseCategorizedListToReadmeMarkdown(categorizedList);

  const results = welcome + "\n\n---\n\n" + parsedMarkdown;
  fs.writeFileSync(GEN_README_FILE_NAME, results, "utf-8");
};

main();
