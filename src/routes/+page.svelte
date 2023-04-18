<script lang="ts">
	import Page from '../components/page.svelte';
	import type { ArchiveItem } from '../data/update-local-news';
	
	export let data: { song: ArchiveItem };
</script>

<Page song={data.song} />