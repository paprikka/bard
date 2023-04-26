<script lang="ts">
	import type { NavListItem } from '../data/get-nav-list';
	import type { ArchiveItem } from '../data/update-local-news';
	import ArticleContainter from './article-containter.svelte';
	import Centaur from './centaur.svelte';
	import Char from './char.svelte';
	import { songToSegments, type LinkItem } from './song-to-segments';
	import Superpope from './superpope.svelte';
	const { floor } = Math;

	export let song: ArchiveItem;
	export let prevLink: NavListItem | null = null;
	export let nextLink: NavListItem | null = null;

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

<ArticleContainter faded={false}>
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
	<p class="author">by <a href="/team#{song.author.id}">{song.author.name}</a></p>
	{#if prevLink || nextLink}
		<nav class="prev-next-post">
			{#if prevLink}<a on:touchend={() => false} href={prevLink.url}>Older</a>
			{:else}<span>Older</span>
			{/if}
			{#if nextLink}<a on:touchend={() => false} href={nextLink.url}>Newer</a>
			{:else}<span>Newer</span>
			{/if}
		</nav>
	{/if}
</ArticleContainter>

<Centaur />
<div class="overlay">
	<Superpope />
</div>

<style>
	.overlay {
		position: fixed;
		pointer-events: none;
		content: '';

		inset: 0;
		z-index: 1;
	}

	.stanza {
		text-align: start;
		font-size: calc(var(--font-size) * 1.4);
	}

	.stanza:first-child {
		margin-block-start: 0;
	}

	.stanza:last-of-type {
		margin-bottom: 2rem;
	}

	.author {
		margin: 1rem 0 0 0;
		position: relative;
		font-size: var(--font-size-s);
		max-width: 20em;
		opacity: 0.5;
		position: relative;
	}

	.author a {
		color: #ac0303;
	}

	.prev-next-post {
		display: flex;
		margin-top: 1rem;
		gap: 1rem;
	}

	.prev-next-post a,
	.prev-next-post span {
		background-color: hsla(0, 0%, 100%, 0.5);
		line-height: 1;
		padding: 0.375rem 0.5rem;
		text-decoration: none;
		color: var(--color-text);
		border-radius: 0.25rem;
		font-size: var(--font-size-s);
	}

	.prev-next-post a {
		opacity: 0.75;
		transition: 0.2s opacity, 0.2s scale;
	}

	@media (hover: hover) {
		.prev-next-post a:hover {
			opacity: 1;
			scale: 1.1;
		}
	}

	.prev-next-post span {
		opacity: 0.25;
		user-select: none;
	}

	.prev-next-post a:active {
		scale: 1;
		opacity: 1;
	}
</style>
