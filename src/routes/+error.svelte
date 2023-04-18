<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<img src="/centaur.png" alt="a centaur" />
	<h1>Something naughty happened</h1>
	<h2>The centaur let Rafal know.</h2>
	<p><a href="/">Back</a></p>
	<p class="error-code">{$page.status} {$page.error?.message}</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-family: var(--font-family);
		padding: 5rem;
		color: #380e0e;
	}

	h1 {
		font-size: var(--font-size-l);
	}
	h2 {
		font-size: var(--font-size-m);
		margin: 0;
	}
	a {
		color: #ac0303;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
	.error-code {
		font-family: monospace;
		display: inline;
		font-size: 0.5rem;
		background-color: rgba(0, 0, 0, 0.1);
		padding: 0.5rem;
		position: absolute;
		bottom: 0.5rem;
		left: 0.5rem;
	}
</style>
