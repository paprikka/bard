import { getAllArchiveItemIDs } from '../../data/update-local-news';
import { getPersistedArchiveItems } from '../get-persisted-archive-items';

export const prerender = true;
export const load = async () => {
	const allDayIDs = await getAllArchiveItemIDs();

	const allPosts = await Promise.all(
		allDayIDs.map(async (dayID) => {
			const songs = await getPersistedArchiveItems(dayID);

			return { dayID, songs };
		})
	);

	const allPostsDescending = [...allPosts].reverse();

	return { allPostsDescending };
};
