<script lang="ts">
	import Superpope from '../components/superpope.svelte';
	import type { ArchiveItem } from '../data/update-local-news';

	export let data = {
		songs: []
	};
	type SimpleSegment = {
		type: 'token',
		value: string
	}
	
	type WrappedSegment = {
		type: 'segment',
		value: WrappedSegment[],
		wrapper: (segments: WrappedSegment[]) => SimpleSegment[],
	}

	type Segment = SimpleSegment | WrappedSegment;

	const getSongAsSegments = (song: ArchiveItem) => {
		const stanzas = song.newsMedieval.split('\n\n').slice(0, 5); // fallback to ensure we fit on the screen
		const segments = stanzas.map(
			(stanza) => stanza.split('\n')
			.map(
				(line) => line.split('').map(char => ({
					type: 'token',
					value: char
				}))
			)
		)

		const highlights = stanzas.map((stanza) => {
			// using a regular expression find all words with more than 4 characters, excluding punctuation and newlines
			const longerWords = stanza.match(/\w{4,}/g);
			console.log({ longerWords });
			if (!(longerWords && longerWords.length)) return null;

			const randomLongerWord = longerWords[Math.floor(Math.random() * longerWords.length)];

			return {
				word: randomLongerWord,
				index: stanza.indexOf(randomLongerWord)
			};
			// replace the first instance of randomLongerWord in stanza with %% randomLongerWord %%
			const highlightedStanza = stanza.replace(
				randomLongerWord,
				`%${randomLongerWord.length}%${randomLongerWord}`
			);

			console.log({ longerWords, randomLongerWord, highlightedStanza });
		});

		return segments;
	};

	$: song = data.songs[0];
	$: formattedNews = !song ? [] : getSongAsSegments(data.songs[0]);
</script>

<article>
	{#each formattedNews as stanza, stanzaIndex}
		<p class="stanza">
			{#each stanza as line, lineIndex}
				{#each line as char, charIndex}
					{#if charIndex === 0 && lineIndex === 0 && stanzaIndex === 0}
						<span>{char.value}</span>
					{:else}
						<span
							style="
							display: inline-block;
							transform: translateY({1 - 0.05 * Math.random() * 0.5}em);
							color: hsl({Math.random() * 40 - 20}deg 60% 13.73%);
							opacity: {0.9 - Math.random() * 0.2};
						">{char.value}</span
						>
					{/if}
				{/each}
				<br />
			{/each}
		</p>
	{/each}
	<p class="author">— {song.author.name}, {song.author.description}</p>
</article>
<a class="centaur" href="https://www.centaur-warns.com/"
	><img src="/centaur.png" alt="a centaur" /></a
>

<div class="overlay" />
<Superpope />

<style>
	@font-face {
		font-family: 'font-default';
		src: url('/fonts/default.woff2') format('woff2'), url('/fonts/default.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'font-drop-caps';
		src: url('/fonts/drop-caps.woff2') format('woff2'), url('/fonts/drop-caps.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	:root {
		--font-family: 'font-default', serif;
		--font-family-drop-caps: 'font-drop-caps', serif;

		--font-size-s: clamp(1rem, 0.3rem + 1vw, 2rem);
		--font-size-m: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		--font-size-l: clamp(2.5rem, 2.2993rem + 0.8451vw, 3.25rem);
	}

	:global(*) {
		box-sizing: border-box;
	}

	/* global style in svelte  */
	:global(html, body) {
		margin: 0;
		padding: 0;
		cursor: url('/cursor.png') 0 0, auto;
	}

	:global(body) {
		font-size: var(--font-size-m);
		/* background: url('/background.jpg') repeat center center fixed; */
		background-color: #f9d395;
		background-size: 60%;
	}

	.overlay {
		position: fixed;
		pointer-events: none;
		content: '';

		inset: 0;
		z-index: 1;
	}

	article {
		padding: 4rem 5rem 5rem;
		line-height: 1;
		position: relative;

		color: #380e0e;
		font-family: var(--font-family);

		height: 100vh;
		overflow: hidden;
	}

	@media all and (max-width: 400px) {
		article {
			padding: 1rem 2rem 2rem;
		}
	}

	article p:first-child {
		margin-top: 0;
	}

	article p:first-child > span:first-child {
		font-family: var(--font-family-drop-caps);
		font-size: 2.85em;
		scale: 1.15;
		translate: 0.12em 0.42em;
		float: left;
		line-height: 1;
		color: #ac0303;
		opacity: 0.8;
		width: 1.05em;
	}

	.stanza {
		white-space: break-spaces;
		text-align: start;
		font-size: calc(var(--font-size) * 1.4);
	}

	.stanza:last-of-type {
		margin-bottom: 2rem;
	}

	.author {
		margin-top: 3rem;
		text-align: right;
		font-size: var(--font-size-s);
		max-width: 30rem;
		opacity: 0.5;
	}

	.centaur {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		width: 10vw;
		vertical-align: bottom;
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
