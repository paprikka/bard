<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleContainter from '../../components/article-containter.svelte';
	import type { ArchiveItem } from '../../data/update-local-news';

	// Force hash update when updating the content in SPA mode
	// Related SO issue: https://stackoverflow.com/questions/74004660/sveltekit-and-css-target-selector
	onMount(() => {
		const oldHash = window.location.hash;
		window.location.hash = '';
		requestAnimationFrame(() => (window.location.hash = oldHash));
	});

	const formatSongTitle = (song: ArchiveItem): string => {
		const title = song.newsMedieval.split('\n')[0];
		// if title ends with punctuation, drop it
		if (title.match(/[.,;:!?]$/)) return title.slice(0, -1);
		return title;
	};

	const formatTextWrap = (text: string) => {
		// replace 'the ' and 'de ' with 'the&nbsp;' and 'de&nbsp;'
		return text.replace(/(the|de|mac)\s/gi, '$1&nbsp;');
	};

	export let data;
</script>

<ArticleContainter>
	<h1>Team</h1>
	<ul class="team-members">
		{#each data.allPostsByAuthorID as post}
			<li class="team-member" id={post.author.id}>
				<div class="thumbnail">
					<img
						src={post.author.avatar}
						alt={post.author.name}
						class:is-offset-kitten={post.author.id === 'aethelred'}
					/>
				</div>
				<div class="description">
					<h2>{@html formatTextWrap(post.author.name)}</h2>
					<p>{post.author.description}</p>
					<h3>Works</h3>
					<ul class="songs">
						{#each post.songs as song, i}
							<li class="song">
								<a href="/{song.date}/{song.author.id}">{formatSongTitle(song)}</a>
								<span class="date">{song.date}</span>
							</li>
						{/each}
					</ul>
				</div>
			</li>
		{/each}
	</ul>
</ArticleContainter>

<style>
	.team-members {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		gap: 3rem;
	}

	@media all and (max-width: 1024px) {
		.team-members {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media all and (max-width: 420px) {
		.team-members {
			grid-template-columns: 1fr;
		}
	}

	.thumbnail {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		aspect-ratio: 1/1;
	}
	.thumbnail img {
		max-width: 100%;
		height: auto;
	}

	.songs {
		list-style: none;
		padding: 0;
		margin: 0;
		line-height: 1.5;
	}

	.song {
		display: flex;
		flex-direction: column;
		margin: 0 0 1rem;
		line-height: 1;
	}

	.song a {
		display: inline-block;
	}

	.date {
		font-size: var(--font-size-xs);
		opacity: 0.5;
		display: block;
	}

	.is-offset-kitten {
		position: relative;
		top: 3rem;
	}

	.team-member:target .thumbnail img {
		animation: targetEnter 1.2s 0.3s both;
	}

	@keyframes targetEnter {
		from {
			transform: scale3d(1, 1, 1);
		}

		10%,
		20% {
			transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
		}

		30%,
		50%,
		70%,
		90% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
		}

		40%,
		60%,
		80% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
		}

		to {
			transform: scale3d(1, 1, 1);
		}
	}

	@media all and (max-width: 420px) {
		.team-member {
			margin-bottom: 1em;
		}
	}

	.team-member h2 {
		margin-block-start: 1rem;
	}

	.team-member h3 {
		margin-bottom: 0.5rem;
	}

	a {
		color: #ac0303;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	p,
	a {
		font-size: var(--font-size-s);
	}
</style>
