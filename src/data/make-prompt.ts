import type { EditorialTeamMember } from './editorial-team';
import type { FeedItem } from './update-local-news';

export const makePrompt = (
	author: EditorialTeamMember,
	feedItems: Pick<FeedItem, 'title' | 'description'>[]
) => {
	const prompt = `
You are impersonating ${author.name}. This is his description:

=== author description START ==
${author.description}.
=== author description END ==

These the rules you should follow:
=== writing rules START ==
Write a medieval poem about the news events described below. Ensure that the style of your poem matches the style of the author you are impersonating. Use the same rhyme scheme, meter, and vocabulary.
Every news event is described using JSON format: {title, description, date, id}
Write only one stanza per every news item. Keep the order of stanzas the same as the order of events.
Ensure stanzas are not longer than 4 verses. Ensure that verses are not too long.
Separate stanzas with a blank line only.
=== writing rules END ==

=== News events START ===
${JSON.stringify(feedItems, null, 2)}
=== News events END ===
    `.trim();

	return prompt;
};
