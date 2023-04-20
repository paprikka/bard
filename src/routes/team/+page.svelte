<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';

	// Currently a placeholder so we can prerender static content without
	// writing throaway code

	export let data;
</script>

<ArticleContainter>
	<h1>Team</h1>
	<div class="grid">
		{#each data.allPostsByAuthorID as post}
			<section class="team-member">
				<img src="/centaur.png" alt={post.author.name} />
				<h2>{post.author.name}</h2>
				<p>{post.author.description}</p>
				<h3>Works</h3>
				<ul>
					{#each post.songs as song, i}
						<li>
							<a href="/{song.date}/{i}">{song.newsMedieval.split('\n')[0]}</a>
							<!-- <span class="author">by {song.author.name}</span> -->
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</ArticleContainter>

<style>
	.team-member img {
		width: 80%;
		height: auto;
	}
	h3 {
		margin-bottom: 0;
	}
	a {
		color: #ac0303;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		line-height: 1.5;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
	}

	@media all and (max-width: 400px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	li {
		margin-bottom: 0;
		line-height: 1;
	}
	p,
	a {
		font-size: var(--font-size-s);
	}

	@media all and (max-width: 400px) {
		li {
			margin-bottom: 1em;
		}
	}
</style>
