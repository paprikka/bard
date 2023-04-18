import { getArchiveItemPath, type ArchiveItem, dateToDayID } from '../data/update-local-news';
import { readFile } from 'fs/promises';

export const getPersistedArchiveItems = async (dayID: string) => {
	const path = getArchiveItemPath(dayID);
	console.log('Getting archive item stored at', path);

	const archiveItem = await readFile(path, 'utf8').then((content) => JSON.parse(content));

	return archiveItem as ArchiveItem[];
};
