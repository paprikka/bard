<script lang="ts">
	import Page from '../../../components/page.svelte';

	export let data;
</script>

<Page song={data.song} prevLink={data.navList.prev} nextLink={data.navList.next} />
