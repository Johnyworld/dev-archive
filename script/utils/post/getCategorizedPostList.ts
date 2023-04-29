import { CategorizedList, Post } from "../../types";

const getCategorizedPostList = (posts: Post[]): CategorizedList => {
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

export default getCategorizedPostList;
