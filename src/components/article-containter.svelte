<script lang="ts">
	export let faded = true;
	export let size: 'fluid' | 'fixed' = 'fluid';
	export let align: 'start' | 'center' = 'start';
</script>

<article
	class:is-faded={faded}
	class:is-fixed={size === 'fixed'}
	class:is-align-center={align === 'center'}
>
	<slot />
</article>

<style>
	article {
		padding: 5rem 5rem 10rem;
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

	.is-align-center {
		margin-inline: auto;
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
		pointer-events: none;
	}

	@media all and (max-width: 400px) {
		article {
			padding: 2rem 2rem 10rem;
		}

		article::after {
			height: 6rem;
		}
	}
</style>
