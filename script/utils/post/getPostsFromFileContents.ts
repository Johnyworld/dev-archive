import { FileContent, Post } from "../../types";
import { getArchivePath } from "../archive";

const regTitle = /[#]{1}\s(.+)/;
const regTags = /(#[A-Z])[A-Za-z]+/g;
const regWrittenAt = /[\d]+년[\d\s]+월[\d\s]+일/g;

const getPostsFromFileContents = async (
  fileContents: FileContent[]
): Promise<Post[]> => {
  return fileContents
    .map(parseFileContentToRawPost)
    .filter(filterPostsHasNotWrittenAt)
    .sort((a, b) => (a.writtenAt > b.writtenAt ? -1 : 1));
};

const filterPostsHasNotWrittenAt = (post: Post | null): post is Post => {
  return post != null;
};

const parseFileContentToRawPost = ({
  fileName,
  fileContent
}: FileContent): Post | null => {
  const path = getArchivePath(fileName);
  const postMetaMarkdown = fileContent.split("---")[0];
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

export default getPostsFromFileContents;
