import { getArchiveItemPath, type ArchiveItem } from "../data/update-local-news";


import { readFile } from "fs/promises";

const getArchiveItem = async () => {
  
  const now = new Date();
  const path = getArchiveItemPath(now);
  console.log('Getting archive item stored at', path)

  const archiveItem = await readFile(path, 'utf8')
    .then((content) => JSON.parse(content))

  return archiveItem as ArchiveItem;

}

export const load = async () => ({
	songs: [await getArchiveItem()]
});

export const prerender = true;