import Parser from 'rss-parser';

type ArticleItem = {
    title: string,
    description: string,
    pubDate: Date,
    link: string,
}


async function fetchFeed(): Promise<ArticleItem[]> {
  const parser = new Parser();
  const feed = await parser.parseURL('https://www.npr.org/rss/rss.php?id=1001');

  return feed.items.map((item) => ({
    title: item.title as string,
    description: item.contentSnippet as string,
    pubDate: new Date(item.pubDate as string),
    link: item.link as string,
  }));
}



export const load = async () => {
    return {
        feedItems: await fetchFeed()
    }
}