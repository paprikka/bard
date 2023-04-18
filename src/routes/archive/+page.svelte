<script lang="ts">
	// Currently a placeholder so we can prerender static content without
	// writing throaway code

	export let data;
</script>

<article>
	<h2>Archive</h2>
	{#each data.allPosts as post}
		<h2>{post.dayID}</h2>
		<ul>
			{#each post.songs as song, i}
				<li>
					<a href="/{post.dayID}/{i}">{song.newsMedieval.split('\n')[0]}</a>
					<span class="author">by {song.author.name}</span>
				</li>
			{/each}
		</ul>
	{/each}
</article>

<style>
	article {
		padding: 5rem;
		line-height: 1;
		position: relative;

		color: #380e0e;
		opacity: 0.8;
		font-family: var(--font-family);

		height: 100vh;
		overflow: hidden;
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

	.author {
		font-size: var(--font-size-s);
	}
</style>
