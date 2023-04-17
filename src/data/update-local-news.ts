import RSSParser from 'rss-parser';
import { writeFile } from 'fs/promises';
import { editorialTeam, type EditorialTeamMember } from './editorial-team';
import Path from 'path';

const getDayOfYear = (date: Date) => {
	const startOfYear = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - startOfYear.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const dayOfYear = Math.floor(diff / oneDay);

	return dayOfYear;
};

const getBard = () => {
	return editorialTeam[getDayOfYear(new Date()) % editorialTeam.length];
};

const makePrompt = (author: EditorialTeamMember, newsModern: any) => {
	const prompt = `
    You are ${author.name} – ${author.description}
    Write a poem about the news events described below.
    Make it not longer than 4 stanzas of 4 lines each.
    The news is described using JSON format: {title, description, date}
    Ensure that the style of your poem matches the style of the author you are impersonating.

    === News events START ===
    ${JSON.stringify(newsModern, null, 2)}
    === News events END ===
    `;

	return prompt;
};

// import newsToday from '../data/today.json';
const parser = new RSSParser();

type FeedItem = {
	title?: string;
	description?: string;
	pubDate?: string;
	link?: string;
};

const getNewsToday = async () => {
	const feedString = await fetch('https://feeds.a.dj.com/rss/RSSWorldNews.xml')
		.then(
			response => response.ok
				? response.text()
				: Promise.reject(new Error(`Failed to fetch news feed: ${response.status} ${response.statusText}`))
		)
	const feed = await parser.parseString(feedString)
	const feedItems: FeedItem[] = feed.items.map((item) => {
		return {
			title: item.title,
			description: item.contentSnippet,
			pubDate: item.pubDate,
			link: item.link
		};
	});

	return { feedItems, feedString };
};

const getNewsMedieval = async (author: EditorialTeamMember, news: FeedItem[]) => {
	const apiKey = process.env.OPENAI_API_KEY;
	const prompt = makePrompt(author, news);
	const result = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }]
		})
	}).then((response) => response.json());

	return result.choices[0].message.content;
};

export type ArchiveItem = {
	author: EditorialTeamMember;
	newsMedieval: string;
}

const getSong = async () => {
	const author = getBard();
	const newsToday = await getNewsToday();

	await persistFeed(newsToday.feedString);
	
	const newsMedieval = await getNewsMedieval(author, newsToday.feedItems);

	return { author, newsMedieval };
};

const dateToDDMMYYYY = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};

export const getArchiveItemPath = (date: Date) =>
	Path.join(process.cwd(), `./src/data/archive/${dateToDDMMYYYY(date)}.json`);

const persistFeed = async (content: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dateToDDMMYYYY(new Date())}.xml`);

	console.log(`Saving RSS feed to ${filename}...`);

	await writeFile(filename, content);
};
	

const persistArchive = async (content: string) => {
	const path = Path.resolve(process.cwd(), './src/data/archive');
	const filename = Path.join(path, `${dateToDDMMYYYY(new Date())}.json`);

	console.log(`Saving news to ${filename}...`);

	await writeFile(filename, content);
};


export const updateLocalNews = () => {
	console.log('Fetching news...');

	return getSong()
		.then((song) => JSON.stringify(song, null, 2))
		.then(persistArchive);
};
