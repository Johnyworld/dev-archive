export interface Post {
  title: string;
  tags: string[];
  path: string;
  writtenAt: string;
}

export interface CategorizedList {
  [tag: string]: Post[];
}

export type Markdown = string;

export interface FileContent {
  fileName: string;
  fileContent: string;
}
