import { error } from '@sveltejs/kit';
import { getAllPostsDescending } from '../data/get-all-posts';
import { getNavList } from '../data/get-nav-list';

export const load = async () => {
	const allPostsDescending = await getAllPostsDescending();
	const song = allPostsDescending.at(-1)?.songs.at(-1);

	if (!song) throw error(500, 'No song found for today');

	const navList = getNavList(allPostsDescending, song);

	return {
		song,
		navList
	};
};

export const prerender = true;
