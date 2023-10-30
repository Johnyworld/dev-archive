import { MDFileData, Post } from '../../types';
import { MD_FILES_PATH } from '../constants';
import fs from 'fs';

const regProperties = /(?<=^---\n)([\s\S]*?)(?=---)/;
const regCreatedAt = /(?<=Created: ("|))([\d]{4}-[\d]{2}-[\d]{2})/;
const regTags = /(?<=- )([\s\S]*?)(?=\n)/g;

export const parseMDFilesDataToPosts = async (fileContents: MDFileData[]): Promise<Post[]> => {
  const posts: Post[] = [];
  const incompleted: string[] = [];

  for (const fileContent of fileContents) {
    const properties = await getProperties(fileContent);
    if (properties === null) {
      incompleted.push(fileContent.fileName);
    } else {
      posts.push(properties);
    }
  }

  return posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
};

const getProperties = async ({ fileName, fileContent }: MDFileData): Promise<Post | null> => {
  const path = `${MD_FILES_PATH}/${fileName}`;
  const propertiesPart = fileContent.match(regProperties)?.[0];
  const createdAt = propertiesPart?.match(regCreatedAt)?.[0];
  const modifiedAt = await getModifiedAt(path);
  const tags = propertiesPart?.match(regTags) || [];
  if (!createdAt) {
    return null;
  }
  return {
    title: fileName.replace('.md', ''),
    path,
    createdAt,
    modifiedAt,
    tags,
  };
};

export const getModifiedAt: (filePath: string) => Promise<string> = (filePath: string) =>
  new Promise((revolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      revolve(stats.mtime.toISOString());
    });
  });
