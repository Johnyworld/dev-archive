import fs from "fs";
import prettier from "prettier";
import { Post } from "../../types";

const PRETTIER_CONFIG = {
  parser: "json",
  tabWidth: 2
} as const;

export const generateJsonFromPosts = (posts: Post[], file: string) => {
  fs.writeFileSync(
    file,
    prettier.format(JSON.stringify(posts), PRETTIER_CONFIG),
    "utf-8"
  );
};
