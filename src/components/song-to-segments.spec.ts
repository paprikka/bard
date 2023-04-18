import { expect, it } from 'vitest';
import { songToSegments } from './song-to-segments';
import type { ArchiveItem } from '../data/update-local-news';


it('should return an empty array', () => {
	expect(
		songToSegments(
			{
				author: {
					description: '',
					name: ''
				},
				feedItems: [],
				newsMedieval: ''
			},
			[]
		)
	).toEqual([[[]]]);
});

it('should return a list of simple segments', () => {
	const song: ArchiveItem = {
		author: {
			description: '',
			name: ''
		},
		newsMedieval: `
one two
um dos

xxx yyy
        `.trim(),
		feedItems: [
			{
				title: 'title 1',
				link: 'link 1'
			},
			{
				title: 'title 2',
				link: 'link 2'
			}
		]
	};

	expect(songToSegments(song, [])).toEqual([
		[
			[
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 'n' },
				{ type: 'token', value: 'e' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 't' },
				{ type: 'token', value: 'w' },
				{ type: 'token', value: 'o' }
			],
			[
				{ type: 'token', value: 'u' },
				{ type: 'token', value: 'm' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'd' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 's' }
			]
		],
		[
			[
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' }
			]
		]
	]);
});

it('should include wrapped segments', () => {
	const song: ArchiveItem = {
		author: {
			description: '',
			name: ''
		},
		newsMedieval: `
one two
um dos

xxx yyy
        `.trim(),
		feedItems: [
			{
				title: 'title 1',
				link: 'link 1'
			},
			{
				title: 'title 2',
				link: 'link 2'
			}
		]
	};

	expect(songToSegments(song, [{
        word: 'two',
        link: 'link 1'
    }, {
        word: 'xxx',
        link: 'link 2'
    }])).toEqual([
		[
			[
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 'n' },
				{ type: 'token', value: 'e' },
				{ type: 'token', value: ' ' },
				{
					type: 'link',
                    link: 'link 1',
					value: [
						{ type: 'token', value: 't' },
						{ type: 'token', value: 'w' },
						{ type: 'token', value: 'o' }
					]
				}
			],
			[
				{ type: 'token', value: 'u' },
				{ type: 'token', value: 'm' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'd' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 's' }
			]
		],
		[
			[
				{
					type: 'link',
                    link: 'link 2',
					value: [
						{ type: 'token', value: 'x' },
						{ type: 'token', value: 'x' },
						{ type: 'token', value: 'x' }
					]
				},
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' }
			]
		]
	]);
});


it('should not mix links and stanzas', () => {
	const song: ArchiveItem = {
		author: {
			description: '',
			name: ''
		},
		newsMedieval: `
one two xxx
um dos

xxx yyy two
        `.trim(),
		feedItems: [
			{
				title: 'title 1',
				link: 'link 1'
			},
			{
				title: 'title 2',
				link: 'link 2'
			}
		]
	};

	expect(songToSegments(song, [{
        word: 'two',
        link: 'link 1'
    }, {
        word: 'um',
        link: 'link 2'
    }])).toEqual([
		[
			[
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 'n' },
				{ type: 'token', value: 'e' },
				{ type: 'token', value: ' ' },
				{
					type: 'link',
                    link: 'link 1',
					value: [
						{ type: 'token', value: 't' },
						{ type: 'token', value: 'w' },
						{ type: 'token', value: 'o' }
					]
				},
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },

			],
			[
				
				{ type: 'token', value: 'u' },
				{ type: 'token', value: 'm' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'd' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 's' }
			]
		],
		[
			[
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 't' },
				{ type: 'token', value: 'w' },
				{ type: 'token', value: 'o' }
			]
		]
	]);
});


it('should not add links if a given stanza does not contain a matching highlight', () => {
	const song: ArchiveItem = {
		author: {
			description: '',
			name: ''
		},
		newsMedieval: `
one two xxx
um dos

xxx yyy two
        `.trim(),
		feedItems: [
			{
				title: 'title 1',
				link: 'link 1'
			},
			{
				title: 'title 2',
				link: 'link 2'
			}
		]
	};

	expect(songToSegments(song, [null, {
        word: 'um',
        link: 'link 2'
    }])).toEqual([
		[
			[
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 'n' },
				{ type: 'token', value: 'e' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 't' },
				{ type: 'token', value: 'w' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },

			],
			[
				
				{ type: 'token', value: 'u' },
				{ type: 'token', value: 'm' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'd' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 's' }
			]
		],
		[
			[
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: 'x' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 't' },
				{ type: 'token', value: 'w' },
				{ type: 'token', value: 'o' }
			]
		]
	]);
});


it('should handle punctuation', () => {
	const song: ArchiveItem = {
		author: {
			description: '',
			name: ''
		},
		newsMedieval: `
one two,
um dos

xxx yyy
        `.trim(),
		feedItems: [
			{
				title: 'title 1',
				link: 'link 1'
			},
			{
				title: 'title 2',
				link: 'link 2'
			}
		]
	};

	expect(songToSegments(song, [{
        word: 'two',
        link: 'link 1'
    }, {
        word: 'xxx',
        link: 'link 2'
    }])).toEqual([
		[
			[
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 'n' },
				{ type: 'token', value: 'e' },
				{ type: 'token', value: ' ' },
				{
					type: 'link',
                    link: 'link 1',
					value: [
						{ type: 'token', value: 't' },
						{ type: 'token', value: 'w' },
						{ type: 'token', value: 'o' }
					]
				},
				{ type: 'token', value: ',' },
			],
			[
				{ type: 'token', value: 'u' },
				{ type: 'token', value: 'm' },
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'd' },
				{ type: 'token', value: 'o' },
				{ type: 'token', value: 's' }
			]
		],
		[
			[
				{
					type: 'link',
                    link: 'link 2',
					value: [
						{ type: 'token', value: 'x' },
						{ type: 'token', value: 'x' },
						{ type: 'token', value: 'x' }
					]
				},
				{ type: 'token', value: ' ' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' },
				{ type: 'token', value: 'y' }
			]
		]
	]);
})