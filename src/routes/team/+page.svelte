<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';

	// Currently a placeholder so we can prerender static content without
	// writing throaway code

	export let data;
</script>

<ArticleContainter>
	<h1>Team</h1>
	<ul class="team-members">
		{#each data.allPostsByAuthorID as post}
			<li class="team-member">
				<div class="thumbnail">
					<img
						src={post.author.avatar}
						alt={post.author.name}
						class:is-offset-kitten={post.author.id === 'aethelred'}
					/>
				</div>
				<div class="description">
					<h2>{post.author.name}</h2>
					<p>{post.author.description}</p>
					<h3>Works</h3>
					<ul class="songs">
						{#each post.songs as song, i}
							<li>
								<a href="/{song.date}/{i}">{song.newsMedieval.split('\n')[0]}</a>
								<!-- <span class="author">by {song.author.name}</span> -->
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

	@media all and (max-width: 400px) {
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

	.songs li {
		margin-bottom: 0;
		line-height: 1;
	}

	.is-offset-kitten {
		position: relative;
		top: 3rem;
	}

	@media all and (max-width: 400px) {
		.team-member {
			margin-bottom: 1em;
		}
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

	p,
	a {
		font-size: var(--font-size-s);
	}
</style>
