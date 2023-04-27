<script lang="ts">
	import type { Segment } from './song-to-segments';
	const { random } = Math;

	export let charIndex: number;
	export let lineIndex: number;
	export let stanzaIndex: number;
	export let char: Segment;
</script>

{#if charIndex === 0 && lineIndex === 0 && stanzaIndex === 0}
	<span class="drop-cap">{char.value}</span>
{:else if char.type === 'link'}
	<a href={char.link} target="_blank">
		{#each char.value as linkChar}
			<span
				style:--opacity={0.87 - random() * 0.2}
				style:color="hsl({(random() - 0.5) * 40}deg 96.57% 34.31%)">{linkChar.value}</span
			>
		{/each}
	</a>
{:else}
	<span
		style:--opacity={0.87 - random() * 0.2}
		style:color="hsl({(random() - 0.5) * 40}deg 60% 13.73%)">{char.value}</span
	>
{/if}

<style>
	.drop-cap {
		font-family: var(--font-family-drop-caps);
		font-size: 2.85em;
		scale: 1.15;
		translate: 0.11em 0.1em;
		float: left;
		line-height: 1;
		color: #ac0303;
		opacity: 0.8;
		width: 1.05em;
	}

	span {
		opacity: var(--opacity);
	}

	a {
		text-decoration: underline;
		color: #ac0303;
		transition: 0.2s scale;
	}

	a span {
		transition: 0.2s opacity;
	}

	a:hover span {
		opacity: 1;
	}
</style>
