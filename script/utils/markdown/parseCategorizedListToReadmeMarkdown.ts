import { CategorizedList, Markdown, Post } from "../../types";

export const parseCategorizedListToReadmeMarkdown = (
  list: CategorizedList
): Markdown => {
  return Object.keys(list)
    .sort((a, b) => (a > b ? 1 : -1))
    .map((tag) => parseCategoryToMarkdown(tag, list[tag]))
    .join("\n\n\\_\n\n");
};

const parseCategoryToMarkdown = (tag: string, posts: Post[]) => {
  const title = `### ${tag}`;
  const contents = parsePostsToListOfMarkdown(posts);
  return `${title}\n\n${contents.join("\n")}`;
};

const parsePostsToListOfMarkdown = (posts: Post[]) => {
  return posts.map(parsePostToListItemOfMarkdown);
};

const parsePostToListItemOfMarkdown = (post: Post) => {
  return `- [${post.title}](${post.path.replace(/\s/g, "%20")})`;
};
