import { expect, it } from 'vitest';
import type { EditorialTeamMember } from './editorial-team';
import { getNavList } from './get-nav-list';
import type { ArchiveItem, FeedItem } from './update-local-news';

it('should return a list of songs', () => {
	const makeAuthor = (mockID: string): EditorialTeamMember => ({
		avatar: `avatar for ${mockID}`,
		name: `name for ${mockID}`,
		description: `description for ${mockID}`,
		id: `author-${mockID}`
	});

	const author1 = makeAuthor('1');
	const author2 = makeAuthor('2');
	const author3 = makeAuthor('3');

	const makeFeedItem = (mockID: string): FeedItem => ({
		description: `description for ${mockID}`,
		id: `id for ${mockID}`,
		link: `link for ${mockID}`,
		title: `title for ${mockID}`
	});

	const makeSong = (
		author: EditorialTeamMember,
		mockID: string,
		date: string,
		feedItems: FeedItem[]
	): ArchiveItem => ({
		author,
		date,
		newsMedieval: `newsMedieval for ${mockID}`,
		feedItems
	});

	const day1song1 = makeSong(author1, 'song 1', '2021-01-01', [
		makeFeedItem('day 1 song 1 feed item 1'),
		makeFeedItem('day 1 song 1 feed item 2'),
		makeFeedItem('day 1 song 1 feed item 3')
	]);

	const day1song2 = makeSong(author2, 'song 2', '2021-01-01', [
		makeFeedItem('day 1 song 2 feed item 1'),
		makeFeedItem('day 1 song 2 feed item 2'),
		makeFeedItem('day 1 song 2 feed item 3')
	]);

	const day2song1 = makeSong(author1, 'song 1', '2021-01-02', [
		makeFeedItem('day 2 song 1 feed item 1'),
		makeFeedItem('day 2 song 1 feed item 2'),
		makeFeedItem('day 2 song 1 feed item 3')
	]);

	const day2song2 = makeSong(author2, 'song 2', '2021-01-02', [
		makeFeedItem('day 2 song 2 feed item 1'),
		makeFeedItem('day 2 song 2 feed item 2'),
		makeFeedItem('day 2 song 2 feed item 3')
	]);

	const day2song3 = makeSong(author3, 'song 3', '2021-01-02', [
		makeFeedItem('day 2 song 3 feed item 1'),
		makeFeedItem('day 2 song 3 feed item 2')
	]);

	const day3song1 = makeSong(author1, 'song 1', '2021-01-03', [
		makeFeedItem('day 3 song 1 feed item 1'),
		makeFeedItem('day 3 song 1 feed item 2'),
		makeFeedItem('day 3 song 1 feed item 3')
	]);

	const day3song2 = makeSong(author2, 'song 2', '2021-01-03', [
		makeFeedItem('day 3 song 2 feed item 1'),
		makeFeedItem('day 3 song 2 feed item 2'),
		makeFeedItem('day 3 song 2 feed item 3')
	]);

	const allPostsDescending = [
		{ dayID: '2021-01-03', songs: [day3song1, day3song2] },
		{ dayID: '2021-01-02', songs: [day2song1, day2song2, day2song3] },
		{ dayID: '2021-01-01', songs: [day1song1, day1song2] }
	];

	// day3song2
	// day3song1
	// day2song3
	// day2song2  <-- next
	// day2song1  <-- today
	// day1song2  <-- prev
	// day1song1

	expect(getNavList(allPostsDescending, day2song2)).toEqual({
		prev: { url: '/2021-01-02/author-1' },
		today: { url: '/2021-01-02/author-2' },
		next: { url: '/2021-01-02/author-3' }
	});

	expect(getNavList(allPostsDescending, day3song1)).toEqual({
		prev: { url: '/2021-01-02/author-3' },
		today: { url: '/2021-01-03/author-1' },
		next: { url: '/2021-01-03/author-2' }
	});

	expect(getNavList(allPostsDescending, day1song1)).toEqual({
		prev: null,
		today: { url: '/2021-01-01/author-1' },
		next: { url: '/2021-01-01/author-2' }
	});

	expect(getNavList(allPostsDescending, day1song2)).toEqual({
		prev: { url: '/2021-01-01/author-1' },
		today: { url: '/2021-01-01/author-2' },
		next: { url: '/2021-01-02/author-1' }
	});
});
