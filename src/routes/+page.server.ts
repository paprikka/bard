import { editorialTeam, type EditorialTeamMember } from '../data/editorial-team';
import RSSParser from 'rss-parser';

const  getDayOfYear = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
  
    return dayOfYear;
  }

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

    return prompt
};

// import newsToday from '../data/today.json';
const parser = new RSSParser();

type FeedItem = {
  title?: string
  description?: string
  pubDate?: string
  link?: string
}

const getNewsToday = async (): Promise<{feedItems: FeedItem[]}> => {
  const feed = await parser.parseURL('https://feeds.a.dj.com/rss/RSSWorldNews.xml')
  const feedItems = feed.items.map((item) => {
    return {
      title: item.title,
      description: item.contentSnippet,
      pubDate: item.pubDate,
      link: item.link
    }
  })
  
  return  {feedItems}
};

const getNewsMedieval = async (author: EditorialTeamMember, news: typeof newsToday['feedItems'] ) => {
    const apiKey = process.env.OPENAI_API_KEY
    const prompt = makePrompt(author, news)
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  })
    .then((response) => response.json())

    return result.choices[0].message.content
}

const getSong = async () => {
	const author = getBard();
	const newsToday = await getNewsToday();
  const newsMedieval = await getNewsMedieval(author, newsToday.feedItems);

	return { author, newsMedieval };
};

export const load = async () => ({
	song: await getSong()
});

export const prerender = true;