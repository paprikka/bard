<script lang="ts">
	import Char from './char.svelte';
	import Superpope from './superpope.svelte';
	import { songToSegments, type LinkItem } from './song-to-segments';
	import type { ArchiveItem } from '../data/update-local-news';
	const { floor } = Math;

	export let song: ArchiveItem;

	const randomWithSeed = (seed: number) => {
		let x = Math.sin(seed) * 10000;
		return x - floor(x);
	};

	const getSongAsSegments = (song: ArchiveItem) => {
		const dayAsMilliSeconds = 1000 * 60 * 60 * 24;
		const seed = floor(Date.now() / dayAsMilliSeconds) * dayAsMilliSeconds;

		const stanzas = song.newsMedieval.split('\n\n').slice(0, 5); // fallback in case GPT misbehaves
		const highlightsDict: (LinkItem | null)[] = stanzas.map((stanza, index) => {
			// using a regular expression find all words with more than 4 characters, excluding punctuation and newlines
			const longerWords = stanza.match(/\w{4,}/g);

			if (!(longerWords && longerWords.length)) return null;

			const randomLongerWord = longerWords[floor(randomWithSeed(seed) * longerWords.length)];

			console.log({ longerWords, randomLongerWord, song });
			if (!song?.feedItems) return null;
			const link = song.feedItems.at(index)?.link;
			if (!link) return null;

			const linkItem: LinkItem = {
				word: randomLongerWord,
				link
			};
			return linkItem;
		});

		const segments = songToSegments(song, highlightsDict);
		return segments;
	};

	$: formattedNews = getSongAsSegments(song);
</script>

<article>
	{#each formattedNews as stanza, stanzaIndex}
		<p class="stanza">
			{#each stanza as line, lineIndex}
				{#each line as char, charIndex}
					<Char {char} {charIndex} {lineIndex} {stanzaIndex} />
				{/each}
				<br />
			{/each}
		</p>
	{/each}
	<p class="author">{song.author.name}, {song.author.description}</p>
</article>

<a class="centaur" href="https://sonnet.io/">
	<img src="/centaur.png" alt="a centaur" />
</a>
<div class="overlay" />
<Superpope />

<style>
	.overlay {
		position: fixed;
		pointer-events: none;
		content: '';

		inset: 0;
		z-index: 1;
	}

	article {
		padding: 5rem;
		line-height: 1;
		position: relative;

		color: #380e0e;
		font-family: var(--font-family);

		height: 100vh;
		overflow: hidden;
	}

	article p:first-child {
		margin-top: 0;
	}

	@media all and (max-width: 400px) {
		article {
			padding: 2rem;
		}
	}

	.stanza {
		text-align: start;
		font-size: calc(var(--font-size) * 1.4);
	}

	.stanza:last-of-type {
		margin-bottom: 2rem;
	}

	.author {
		margin: 3rem 0 0 0;
		position: relative;
		padding-left: 1.25em;
		font-size: var(--font-size-s);
		max-width: 20em;
		opacity: 0.5;
		position: relative;
	}

	.author::before {
		content: '—';
		position: absolute;
		left: 0;
		top: -0.1em;
	}

	.centaur {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		width: 10vw;
		vertical-align: bottom;
		transition: scale 0.2s;
	}

	.centaur:hover {
		scale: 1.05;
	}

	.centaur:active {
		scale: 1;
	}

	@media all and (max-width: 400px) {
		.centaur {
			width: 30vw;
			z-index: -1;
		}
	}

	.centaur img {
		width: 100%;
		height: auto;
	}
</style>
