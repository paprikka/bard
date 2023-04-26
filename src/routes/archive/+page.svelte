<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';
	import Centaur from '../../components/centaur.svelte';
	import { getSongURL } from '../../data/get-post-url';

	export let data;
</script>

<ArticleContainter size="fixed">
	<h2>Archive</h2>
	{#each data.allPostsDescending as post}
		<h2>{post.dayID}</h2>
		<ul>
			{#each post.songs as song}
				<li>
					<a href={getSongURL(post.dayID, song.author)}>{song.newsMedieval.split('\n')[0]}</a>
					<span class="author">by <a href="/team">{song.author.name}</a></span>
				</li>
			{/each}
		</ul>
	{/each}
</ArticleContainter>
<Centaur />

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

	li {
		line-height: 1;
		margin-bottom: 1em;
	}
	.author {
		display: block;
		font-size: var(--font-size-s);
		opacity: 0.7;
	}
</style>
