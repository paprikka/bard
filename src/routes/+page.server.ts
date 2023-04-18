import { dateToDayID } from '../data/update-local-news';
import { getPersistedArchiveItems } from './get-persisted-archive-items';

const getTodaysSong = () => {
	const todayID = dateToDayID(new Date());
	return getPersistedArchiveItems(todayID).then((items) => items[0]);
};
export const load = async () => ({
	song: await getTodaysSong()
});

export const prerender = true;
