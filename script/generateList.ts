import fs from "fs";
import prettier from "prettier";
import { GEN_FILE_NAME } from "./utils/constants";
import { Post } from "./types";

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

const getPostInfo: (fileName: string) => Promise<Post | null> = (fileName) =>
  new Promise((resolve, reject) => {
    const path = `archive/${fileName}`;
    fs.readFile(path, "utf-8", (err, dataRaw: string) => {
      if (err) {
        reject(err);
      }
      const data = dataRaw.split("---")[0];
      const title: string | null =
        data?.match(regTitle)?.[0]?.replace("# ", "") || null;

      const writtenAt = data.match(regWrittenAt)?.[0];

      if (!writtenAt) {
        console.warn("❌ ", fileName);
        return resolve(null);
      }

      if (!title) {
        console.warn("🚧 ", fileName);
      } else {
        console.log("➕ ", fileName);
      }

      const tags =
        data.match(regTags)?.map((tag) => tag.replace("#", "")) || [];

      resolve({
        title: title || fileName.replace(".md", ""),
        path,
        tags,
        writtenAt
      });
    });
  });

const main = async () => {
  const fileNames = await getFileNames();

  const list = await Promise.all([
    ...fileNames.map((fileName) => getPostInfo(fileName))
  ]);

  const posts: Post[] = list
    .filter((item): item is Post => item != null)
    .sort((a, b) => (a.writtenAt > b.writtenAt ? -1 : 1));

  fs.writeFileSync(
    GEN_FILE_NAME,
    prettier.format(JSON.stringify(posts), PRETTIER_CONFIG),
    "utf-8"
  );

  console.log("---");
  console.log("➕: 통과");
  console.log("🚧: 제목이 없습니다. 파일명으로 대체합니다.");
  console.log("❌: 날짜가 없습니다. 리스트에서 제외합니다.");
  console.log("---");
};

main();
