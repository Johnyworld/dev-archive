import { CategorizedList, Post } from "../../types";

export const getCategorizedPostList = (posts: Post[]): CategorizedList => {
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
