export interface Post {
  title: string;
  tags: string[];
  path: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CategorizedList {
  [tag: string]: Post[];
}

export type Markdown = string;

export interface MDFileData {
  fileName: string;
  fileContent: string;
}
