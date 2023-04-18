<script lang="ts">
	// Currently a placeholder so we can prerender static content without
	// writing throaway code

	export let data;
</script>

{#each data.allPosts as post}
	<h2>{post.dayID}</h2>
	{#each post.songs as song, i}
		<a href="/{post.dayID}/{i}">{song.newsMedieval.slice(0, 20)}&hellip;</a>
	{/each}
{/each}
