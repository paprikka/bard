import { getPersistedArchiveItems } from '../routes/get-persisted-archive-items';
import { getAllArchiveItemIDs } from './update-local-news';

export const getAllPostsDescending = async () => {
	const allDayIDs = await getAllArchiveItemIDs();

	const allPosts = await Promise.all(
		allDayIDs.map(async (dayID) => {
			const songs = await getPersistedArchiveItems(dayID);

			return { dayID, songs };
		})
	);

	const allPostsDescending = [...allPosts].reverse();

	return allPostsDescending;
};
