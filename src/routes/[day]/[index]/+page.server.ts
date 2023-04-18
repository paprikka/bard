import { getPersistedArchiveItems } from '../../get-persisted-archive-items';

export const prerender = true;

export const load = async ({ params }) => {
	const { day, index } = params;
	const allSongsForToday = await getPersistedArchiveItems(day);
	const song = allSongsForToday.at(parseInt(index));

	return { song };
};
