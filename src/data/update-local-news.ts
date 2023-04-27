import RSSParser from 'rss-parser';
import { writeFile, readFile, readdir } from 'fs/promises';
import { editorialTeam, type EditorialTeamMember } from './editorial-team';
import Path from 'path';
import { retryPromiseWithDelay } from '../utils/retry-with-delay';

const getDayOfYear = (date: Date) => {
	const startOfYear = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - startOfYear.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const dayOfYear = Math.floor(diff / oneDay);

	return dayOfYear;
};

const getBard = (offset: number, editorialTeam: EditorialTeamMember[]) => {
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
export type FeedItem = {
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

	if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

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
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Failed to fetch news feed: ${response.status} ${response.statusText}`);
		}
		return response.json();
	});

	const { content } = result.choices[0]?.message;

	if (!content) throw new Error('No content in OpenAPI response');

	return result.choices[0].message.content as string;
};

export type ArchiveItem = {
	author: EditorialTeamMember;
	date: string;
	newsMedieval: string;
	feedItems: FeedItem[];
};

const getArchiveItem = async (
	author: EditorialTeamMember,
	feedItems: FeedItem[],
	dayID: string
): Promise<ArchiveItem> => {
	const newsMedieval = await getNewsMedieval(author, feedItems);

	console.log('===========================');
	console.log('Medieval:', newsMedieval);
	console.log('===========================');
	console.log('Modern:', feedItems.map((_) => _.title).join('\n'));
	console.log('===========================');

	return { author, newsMedieval, feedItems, date: dayID };
};

const getNewsForFeedItems = async (feedItems: FeedItem[], dayID: string) => {
	const newsItemsGrouped = feedItems.reduce(
		(acc, item) => {
			const last = acc.at(-1);
			if (last?.length === 3) return [...acc, [item]];

			const head = acc.slice(0, -1);
			const tail = [...(last || []), item];

			return [...head, tail];
		},
		[[]] as FeedItem[][]
	);

	const editorialTeamShuffled = [...editorialTeam].sort(() => Math.random() - 0.5);

	const promises = newsItemsGrouped
		.slice(0, 4) // keep low before the release
		.map((newsItems, ind) =>
			retryPromiseWithDelay(
				() => getArchiveItem(getBard(ind, editorialTeamShuffled), newsItems, dayID),
				1000,
				3
			)
		);

	return Promise.all(promises);
};

const getArchiveItemsForExistingFeed = async (dayID: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dayID}.xml`);

	console.log(`Reading RSS feed from ${filename}...`);

	const feedString = await readFile(filename, 'utf-8');
	const localFeedXML = await parser.parseString(feedString);
	return getNewsForFeedItems(localFeedXML.items, dayID);
};

const getArchiveItems = async (dayID: string) => {
	const newsToday = await getNewsToday();
	await persistFeed(newsToday.feedString);

	return getNewsForFeedItems(newsToday.feedItems, dayID);
};

export const dateToDayID = (date: Date) => {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
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

const persistArchive = (dateID: string) => async (content: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dateID}.json`);

	console.log(`Saving news to ${filename}...`);

	await writeFile(filename, content);
};

export const getArchiveItemForExistingDate = (existingDateID: string) => {
	return getArchiveItemsForExistingFeed(existingDateID)
		.then((song) => JSON.stringify(song, null, 2))
		.then(persistArchive(existingDateID));
};

export const updateLocalNewsForDateID = (dateID: string) => {
	console.log(`Updating news for ${dateID}...`);
	return getArchiveItems(dateID)
		.then((song) => JSON.stringify(song, null, 2))
		.then(persistArchive(dateID));
};

export const updateLocalNews = () => {
	console.log('Fetching news...');
	const todayID = dateToDayID(new Date());
	return updateLocalNewsForDateID(todayID);
};
