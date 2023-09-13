import type { ArchiveItem } from '../data/update-local-news';

type SimpleSegment = {
	type: 'token';
	value: string;
};

type LinkSegment = {
	type: 'link';
	value: SimpleSegment[];
	link: string;
};

export type Segment = SimpleSegment | LinkSegment;
export type LinkItem = { word: string; link: string };

const toSegments = (multilineText: string, dict: (LinkItem | null)[]): Segment[][] => {
	// Create a dictionary for quick lookups
	const linkDict: { [word: string]: string } = dict.reduce((acc, curr) => {
		if (!curr) return acc;
		acc[curr.word] = curr.link;
		return acc;
	}, {} as { [word: string]: string });

	// Split text by lines
	const lines = multilineText.split('\n');
	const wordToToken = (word: string): SimpleSegment[] =>
		word.split('').map((char) => ({
			type: 'token',
			value: char
		}));

	return lines.map((line) => {
		const segments: Segment[] = [];
		const words = [...Array.from(line.matchAll(/(\s|\w+|[^\w\s]+)/g))].map((match) => match[0]);

		words.forEach((word, index) => {
			if (linkDict[word]) {
				// Create a LinkSegment with SimpleSegments for each character
				segments.push({
					type: 'link',
					value: wordToToken(word),
					link: linkDict[word]
				});
			} else {
				// Create SimpleSegments for each character
				word.split('').forEach((char) => {
					segments.push({
						type: 'token',
						value: char
					});
				});
			}
		});
		console.dir(
			{ linkSegments: segments.flat().filter((s) => s.type === 'link') },
			{ depth: Infinity }
		);
		return segments;
	});
};

export const songToSegments = (song: ArchiveItem, dict: (LinkItem | null)[]): Segment[][][] => {
	const result = song.newsMedieval
		.split('\n\n')
		.map((paragraph, index) => toSegments(paragraph, dict[index] ? [dict[index]] : []));

	return result;
};
