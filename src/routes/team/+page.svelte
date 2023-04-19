<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';

	// Currently a placeholder so we can prerender static content without
	// writing throaway code

	export let data;
</script>

<ArticleContainter>
	<h2>Archive</h2>
	{#each data.allPostsByAuthorID as post}
		<h2>{post.author.name}</h2>
		<p>{post.author.description}</p>
		<ul>
			{#each post.songs as song, i}
				<li>
					<a href="/{song.date}/{i}">{song.newsMedieval.split('\n')[0]}</a>
					<span class="author">by {song.author.name}</span>
				</li>
			{/each}
		</ul>
	{/each}
</ArticleContainter>

<style>
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

	.author {
		font-size: var(--font-size-s);
	}

	@media all and (max-width: 400px) {
		.author {
			display: block;
		}

		li {
			margin-bottom: 1em;
		}
	}
</style>
