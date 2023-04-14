<script lang="ts">
	export let data;
	type Char = {
		char: string;
		offsetY: number;
        opacity: number;
	};

	$: formattedNews = !data?.song?.newsMedieval
		? []
		: ([...data.song.newsMedieval.split('\n\n')].slice(0, 5).map((stanza: string) =>
				stanza.split('\n').map((line) =>
					line
						.trim()
						.split('')
						.map((char, index) => ({
							char,
							offsetY: Math.random() * 0.5 - 1,
							opacity: 1 - Math.random() * 0.2
						}))
				)
		  ) as Char[][][]);
</script>

<article>
	{#each formattedNews as paragraph}
		<p class="stanza">
			{#each paragraph as line}
				{#each line as char}
					<span
						style="display: inline-block; transform: translateY({0.1 *
							char.offsetY}em); opacity: {char.opacity}"
					>
						{char.char}
					</span>
				{/each}
				<br />
			{/each}
		</p>
	{/each}
	<p class="author">— {data.song.author.name}, {data.song.author.description}</p>
</article>
<div class="overlay" />

<style>
	@font-face {
		font-family: 'font-default';
		src: url('/fonts/default.woff2') format('woff2'), url('/fonts/default.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	:root {
		--font-family: 'font-default', serif;

		--font-size-s: clamp(1rem, 0.3rem + 1vw, 2rem);
		--font-size-m: clamp(1.25rem, 0.5rem + 1vw, 2.75rem);
		--font-size-l: clamp(2.5rem, 2.2993rem + 0.8451vw, 3.25rem);
	}

	:global(*) {
		box-sizing: border-box;
	}

	/* global style in svelte  */
	:global(html, body) {
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-size: var(--font-size-m);
		background: url('/background.jpg') repeat center center fixed;
		background-size: 60%;
	}

	.overlay {
		position: fixed;
		pointer-events: none;
		content: '';

		inset: 0;
		z-index: 1;
		box-shadow: inset 0 0 10vw 0 rgba(124, 0, 0, 0.5), inset 0 0 18vw 0 rgba(86, 56, 56, 0.2);
	}

	article {
		align-self: center;
		width: fit-content;
		margin: 0 auto;
		padding: 1rem;
		line-height: 1;
        position: relative;

		color: #380e0e;
		font-family: var(--font-family);

        height: 100vh;
        overflow: hidden;
	}

    article:before {
        content: '';
        position: absolute;
        top: 0;
        left: .96rem;
        width: 1px;
        /* gradient top to bottom transparent at the top and bottom black in the middle */
        background: linear-gradient(
                rgba(0, 0, 0, 0), 
                black 30%,
                rgba(0, 0, 0, .6) 50%,
                rgba(0, 0, 0, .8) 70%,
                black 50%,
                rgba(0, 0, 0, 0)
        );
        opacity: 0.3;
        height: 100%;
    }

    article:after {
        content: '';
        position: absolute;
        top: 0;
        right: 1rem;
        width: 1px;
        background: linear-gradient(
                rgba(0, 0, 0, 0), 
                black 30%,
                rgba(0, 0, 0, .6) 50%,
                rgba(0, 0, 0, .8) 70%,
                black 50%,
                rgba(0, 0, 0, 0)
        );
        opacity: 0.2;
        height: 100%;
    }

	article p:first-child > span:first-child {
		font-size: 2.95em;
		float: left;
		line-height: 1;
		margin: 0 0.1em 0 0;
		color: rgb(147, 17, 17);
	}

	.stanza {
		white-space: break-spaces;
		text-align: start;
		font-size: calc(var(--font-size) * 1.4);
	}

	.author {
		font-style: italic;
		text-align: right;
		font-size: var(--font-size-s);
		max-width: 30rem;
	}
</style>
