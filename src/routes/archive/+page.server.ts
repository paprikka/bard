import { getAllPostsDescending } from '../../data/get-all-posts';
import { getAllArchiveItemIDs } from '../../data/update-local-news';
import { getPersistedArchiveItems } from '../get-persisted-archive-items';

export const prerender = true;
export const load = async () => {
	return { allPostsDescending: getAllPostsDescending() };
};
