import RSSParser from 'rss-parser';
import { writeFile, readdir } from 'fs/promises';
import { editorialTeam, type EditorialTeamMember } from './editorial-team';
import Path from 'path';

const getDayOfYear = (date: Date) => {
	const startOfYear = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - startOfYear.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const dayOfYear = Math.floor(diff / oneDay);

	return dayOfYear;
};

const getBard = (offset: number) => {
	return editorialTeam[(getDayOfYear(new Date()) + offset) % editorialTeam.length];
};

const makePrompt = (
	author: EditorialTeamMember,
	feedItems: Pick<FeedItem, 'title' | 'description'>[]
) => {
	const prompt = `
You are impersonating ${author.name} – ${author.description}.
Write a medieval poem about the news events described below. 
Every news event is described using JSON format: {title, description, date, id}
Write only one stanza per every news item. Keep the order of stanzas the same as the order of events.
Separate stanzas with a blank line only.
Ensure that the style of your poem matches the style of the author you are impersonating. Use the same rhyme scheme, meter, and vocabulary.

=== News events START ===
${JSON.stringify(feedItems, null, 2)}
=== News events END ===
    `.trim();

	return prompt;
};

// import newsToday from '../data/today.json';
const parser = new RSSParser();
type FeedItem = {
	title?: string;
	description?: string;
	link?: string;
	id?: string;
};
const getNewsToday = async () => {
	const feedString = await fetch('https://feeds.a.dj.com/rss/RSSWorldNews.xml').then((response) =>
		response.ok
			? response.text()
			: Promise.reject(
					new Error(`Failed to fetch news feed: ${response.status} ${response.statusText}`)
			  )
	);
	const feed = await parser.parseString(feedString);
	const feedItems: FeedItem[] = feed.items.map((item) => {
		return {
			title: item.title,
			description: item.contentSnippet,
			link: item.link,
			id: item.guid
		};
	});

	return { feedItems, feedString };
};

const getNewsMedieval = async (author: EditorialTeamMember, news: FeedItem[]) => {
	const apiKey = process.env.OPENAI_API_KEY;
	const prompt = makePrompt(
		author,
		news.map(({ title, description }) => ({ title, description }))
	);

	console.log('Prompt:', prompt);

	const result = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: 'gpt-4',
			messages: [{ role: 'user', content: prompt }]
		})
	}).then((response) => response.json());

	return result.choices[0].message.content;
};

export type ArchiveItem = {
	author: EditorialTeamMember;
	newsMedieval: string;
	feedItems: FeedItem[];
};

const getArchiveItem = async (author: EditorialTeamMember, feedItems: FeedItem[]) => {
	const newsMedieval = await getNewsMedieval(author, feedItems);

	console.log('===========================');
	console.log('Medieval:', newsMedieval);
	console.log('===========================');
	console.log('Modern:', feedItems.map((_) => _.title).join('\n'));
	console.log('===========================');

	return { author, newsMedieval, feedItems };
};

const getArchiveItems = async () => {
	const newsToday = await getNewsToday();
	await persistFeed(newsToday.feedString);

	const newsItemsGrouped = newsToday.feedItems.reduce(
		(acc, item) => {
			const last = acc.at(-1);
			if (last?.length === 3) return [...acc, [item]];

			const head = acc.slice(0, -1);
			const tail = [...(last || []), item];
			// console.log({head, tail})
			return [...head, tail];
		},
		[[]] as FeedItem[][]
	);

	const promises = newsItemsGrouped
		.slice(0, 3) // keep low before the release
		.map((newsItems, ind) => getArchiveItem(getBard(ind), newsItems));

	return Promise.all(promises);
};

export const dateToDayID = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};

export const getAllArchiveItemIDs = () => {
	const path = Path.resolve(process.cwd(), './src/data/archive');

	return readdir(path)
		.then((files) => files.filter((file) => file.endsWith('.json')))
		.then((files) => files.map((file) => file.replace('.json', '')));
};

export const getArchiveItemPath = (dayID: string) =>
	Path.join(process.cwd(), `./src/data/archive/${dayID}.json`);

const persistFeed = async (content: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dateToDayID(new Date())}.xml`);

	console.log(`Saving RSS feed to ${filename}...`);

	await writeFile(filename, content);
};

const persistArchive = async (content: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dateToDayID(new Date())}.json`);

	console.log(`Saving news to ${filename}...`);

	await writeFile(filename, content);
};

export const updateLocalNews = () => {
	console.log('Fetching news...');

	return getArchiveItems()
		.then((song) => JSON.stringify(song, null, 2))
		.then(persistArchive);
};
