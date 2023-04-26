import { getSongURL } from './get-post-url';
import type { ArchiveItem } from './update-local-news';

export type NavListItem = {
	url: string;
};

export const getNavList = (
	allPostsDescending: { dayID: string; songs: ArchiveItem[] }[],
	currentSong: ArchiveItem
): {
	prev: NavListItem | null;
	next: NavListItem | null;
	today: NavListItem;
} => {
	// TODO: this will break once we start supporting multiple authors per day
	const allPostsDescendingFlat = allPostsDescending.flatMap((post) => [...post.songs].reverse());

	const currentSongIndex = allPostsDescendingFlat.findIndex(
		(song) => song.author.id === currentSong.author.id && song.date === currentSong.date
	);

	if (currentSongIndex === -1) throw new Error('Current song not found in all posts');

	const prevSong = allPostsDescendingFlat[currentSongIndex + 1] || null;
	const nextSong = allPostsDescendingFlat[currentSongIndex - 1] || null;
	const todaySong = allPostsDescendingFlat[currentSongIndex];

	return {
		prev: prevSong ? { url: getSongURL(prevSong.date, prevSong.author) } : null,
		today: { url: getSongURL(todaySong.date, todaySong.author) },
		next: nextSong ? { url: getSongURL(nextSong.date, nextSong.author) } : null
	};
};
