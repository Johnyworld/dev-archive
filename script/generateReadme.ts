import fs from "fs";
import { GEN_FILE_NAME, GEN_README_FILE_NAME } from "./utils/constants";
import { CategorizedList, Markdown, Post } from "./types";

const welcome = `# 안녕하세요.

> 이곳은 개발자 김재환의 글 보관소 입니다.
> 작은 생각부터, 공들인 글까지.
> 디지털 정원으로 가꾸는 공간입니다.`;

const getGeneratedListJsonFile: () => Promise<Post[]> = () =>
  new Promise((resolve, reject) => {
    fs.readFile(GEN_FILE_NAME, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });

const getCaterorizedList = (posts: Post[]): CategorizedList => {
  const list: CategorizedList = {};
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      if (list[tag]) {
        list[tag].push(post);
      } else {
        list[tag] = [post];
      }
    });
  });
  return list;
};

const parseToReadmeMarkdown = (list: CategorizedList): Markdown => {
  return Object.keys(list)
    .sort((a, b) => (a > b ? 1 : -1))
    .map((tag) => {
      const title = `### ${tag}`;
      const contents = list[tag].map((post) => {
        return `- [${post.title}](${post.path.replace(/\s/g, "%20")})`;
      });
      return `${title}\n\n${contents.join("\n")}`;
    })
    .join("\n\n\\_\n\n");
};

const generateReadmeFile = (markdown: Markdown) => {
  const results = welcome + "\n\n---\n\n" + markdown;
  fs.writeFileSync(GEN_README_FILE_NAME, results, "utf-8");
};

const main = async () => {
  const posts: Post[] = await getGeneratedListJsonFile();
  const categorizedList = getCaterorizedList(posts);
  const parsedMarkdown = parseToReadmeMarkdown(categorizedList);
  generateReadmeFile(parsedMarkdown);
};

main();
