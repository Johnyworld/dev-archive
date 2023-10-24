export interface Post {
  title: string;
  tags: string[];
  path: string;
  createdAt: string;
}

export interface CategorizedList {
  [tag: string]: Post[];
}

export type Markdown = string;

export interface MDFileData {
  fileName: string;
  fileContent: string;
}
