import fs from "fs";
import prettier from "prettier";
import { GEN_FILE_NAME } from "./utils/constants";
import { Markdown, Post } from "./types";

const regTitle = /[#]{1}\s(.+)/;
const regTags = /(#[A-Z])[A-Za-z]+/g;
const regWrittenAt = /[\d]+년[\d\s]+월[\d\s]+일/g;

const PRETTIER_CONFIG = {
  parser: "json",
  tabWidth: 2
} as const;

const getFileNames: () => Promise<string[]> = () =>
  new Promise((revolve, reject) => {
    fs.readdir("archive", (err, data) => {
      if (err) {
        reject(err);
      }
      revolve(data);
    });
  });

const getPath = (fileName: string) => `archive/${fileName}`;

const getPostMarkdown = (fileName: string): Promise<Markdown> =>
  new Promise((resolve, reject) => {
    const path = getPath(fileName);
    fs.readFile(path, "utf-8", (err, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

const parseMarkdownToPost = (
  fileName: string,
  markdown: Markdown
): Post | null => {
  const path = getPath(fileName);
  const postMetaMarkdown = markdown.split("---")[0];
  const title: string | null =
    postMetaMarkdown?.match(regTitle)?.[0]?.replace("# ", "") || null;
  const writtenAt = postMetaMarkdown.match(regWrittenAt)?.[0];
  const tags =
    postMetaMarkdown.match(regTags)?.map((tag) => tag.replace("#", "")) || [];

  if (!writtenAt) {
    console.warn("❌ ", fileName);
    return null;
  }
  if (!title) {
    console.warn("🚧 ", fileName);
  } else {
    console.log("➕ ", fileName);
  }

  return {
    title: title || fileName.replace(".md", ""),
    path,
    tags,
    writtenAt
  };
};

const parseFileNameToPost = async (fileName: string): Promise<Post | null> => {
  const markdown = await getPostMarkdown(fileName);
  return parseMarkdownToPost(fileName, markdown);
};

const parseFileNamesToPost = async (fileNames: string[]): Promise<Post[]> => {
  const posts = await Promise.all([...fileNames.map(parseFileNameToPost)]);
  return posts
    .filter(filterPostsHasNotWrittenAt)
    .sort((a, b) => (a.writtenAt > b.writtenAt ? -1 : 1));
};

const filterPostsHasNotWrittenAt = (post: Post | null): post is Post => {
  return post != null;
};

const generateList = (posts: Post[]) => {
  fs.writeFileSync(
    GEN_FILE_NAME,
    prettier.format(JSON.stringify(posts), PRETTIER_CONFIG),
    "utf-8"
  );
};

const showLogs = () => {
  console.log("---");
  console.log("➕: 통과");
  console.log("🚧: 제목이 없습니다. 파일명으로 대체합니다.");
  console.log("❌: 날짜가 없습니다. 리스트에서 제외합니다.");
  console.log("---");
};

const main = async () => {
  const fileNames = await getFileNames();
  const posts = await parseFileNamesToPost(fileNames);
  generateList(posts);
  showLogs();
};

main();
