<script lang="ts">
	export let faded = true;
	export let size: 'fluid' | 'fixed' = 'fluid';
</script>

<article class:is-faded={faded} class:is-fixed={size === 'fixed'}>
	<slot />
</article>

<style>
	article {
		padding: 5rem 5rem 8rem;
		line-height: 1;
		position: relative;

		color: var(--color-text);
		font-family: var(--font-family);
	}

	.is-faded {
		opacity: 0.8;
	}

	.is-fixed {
		max-width: 60rem;
	}

	article::after {
		content: '';
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 12rem;
		background: url('/background.jpg') repeat center center fixed;
		-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%, black);
		mask-image: linear-gradient(to bottom, transparent 0%, black 50%, black);
	}

	@media all and (max-width: 400px) {
		article {
			padding: 2rem;
		}
	}
</style>
