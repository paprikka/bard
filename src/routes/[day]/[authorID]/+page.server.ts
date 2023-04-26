import { getPersistedArchiveItems } from '../../get-persisted-archive-items';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = async ({ params }) => {
	const { day, authorID } = params;
	const allSongsForToday = await getPersistedArchiveItems(day);
	const song = allSongsForToday.find((song) => song.author.id === authorID);

	if (!song) throw error(404, 'Song not found');

	return { song };
};
