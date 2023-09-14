import { BYPASS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { getAllPostsDescending } from '../../../data/get-all-posts';
import { getNavList } from '../../../data/get-nav-list';
import type { ArchiveItem } from '../../../data/update-local-news';

export const prerender = true;

export const load = async ({ params }) => {
	const { day, authorID } = params;
	const allPostsDescending = await getAllPostsDescending();
	const song: ArchiveItem | undefined = allPostsDescending
		.flatMap((post) => post.songs)
		.find((song) => song.author.id === authorID && song.date === day);

	if (!song) throw error(404, 'Song not found');

	const navList = getNavList(allPostsDescending, song);

	return { song, navList };
};
