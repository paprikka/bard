import type { EditorialTeamMember } from '../../data/editorial-team';
import { editorialTeam } from '../../data/editorial-team';
import { getAllArchiveItemIDs, type ArchiveItem } from '../../data/update-local-news';
import { getPersistedArchiveItems } from '../get-persisted-archive-items';

export const prerender = true;
export const load = async () => {
	const allDayIDs = await getAllArchiveItemIDs();
	const editorialTeamDict = editorialTeam.reduce((all, curr) => {}, {} as {});
	const allAuthorIDs = editorialTeam.map((author) => author.id);

	const allPosts = await Promise.all(
		allDayIDs.map(async (dayID) => {
			const songs = await getPersistedArchiveItems(dayID);

			return { dayID, songs };
		})
	);

	const allPostsByAuthorID = editorialTeam.map((author) => {
		const songs = allPosts.reduce((all, current) => {
			return [...all, ...current.songs.filter((song) => song.author.id === author.id)];
		}, [] as ArchiveItem[]);

		return {
			author,
			songs
		};
	});

	return { allPostsByAuthorID };
};
