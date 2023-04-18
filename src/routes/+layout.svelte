<slot />
<nav>
	<ul>
		<li><a href="/">Today</a></li>
		<li><a href="/archive">Archive</a></li>
		<li><a href="https://sonnet.io/posts/reactive-hole/">Why?</a></li>
	</ul>
</nav>
<svelte:head>
	<title>Bard: Spicy Medieval News</title>
</svelte:head>

<style>
	@font-face {
		font-family: 'font-default';
		src: url('/fonts/default.woff2') format('woff2'), url('/fonts/default.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'font-drop-caps';
		src: url('/fonts/drop-caps.woff2') format('woff2'), url('/fonts/drop-caps.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	:global(:root) {
		--font-family: 'font-default', serif;
		--font-family-drop-caps: 'font-drop-caps', serif;

		--font-size-s: clamp(1rem, 0.3rem + 1vw, 2rem);
		--font-size-m: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		--font-size-l: clamp(2.5rem, 2.2993rem + 0.8451vw, 3.25rem);
	}

	:global(*) {
		box-sizing: border-box;
	}

	/* global style in svelte  */
	:global(html, body) {
		margin: 0;
		padding: 0;
		cursor: url('/cursor.png') 0 0, auto;
	}

	:global(body) {
		font-size: var(--font-size-m);
		background: url('/background.jpg') repeat center center fixed;
		background-color: #f9d395;
		background-size: 60%;
	}

	nav {
		position: absolute;
		left: 5rem;
		bottom: 5rem;

		font-family: var(--font-family);
		font-size: var(--font-size-m);
	}

	/*TODO: use variables */
	@media all and (max-width: 400px) {
		nav {
			left: 2rem;
			bottom: 2rem;
		}
	}
	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1em;
	}
	nav li {
		display: inline-block;
	}
	nav a {
		color: #ac0303;
		text-decoration: none;
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	nav a:hover {
		text-decoration: underline;
		opacity: 1;
	}
</style>
