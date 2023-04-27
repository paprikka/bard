<slot />
<nav>
	<ul>
		<li><a href="/">Today</a></li>
		<li><a href="/archive">Archive</a></li>
		<li><a href="/team">Team</a></li>
		<li><a href="https://sonnet.io/posts/reactive-hole/">Why?</a></li>
	</ul>
</nav>
<svelte:head>
	<title>Bard: Spicy Medieval News</title>
	<script
		async
		defer
		data-website-id="dcfdf23e-805d-4bec-a639-6c7335abfc7d"
		data-domains="readdeadpeople.com"
		src="https://sonnet-events.vercel.app/umami.js"
	></script>
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

		--font-size-xs: clamp(1rem, 0.2rem + 0.75vw, 1.5rem);
		--font-size-s: clamp(1rem, 0.3rem + 1vw, 2rem);
		--font-size-m: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		--font-size-l: clamp(2.5rem, 2.2993rem + 0.8451vw, 3.25rem);

		--color-text: #380e0e;
		--color-link: #ac0303;
		--color-link-fade: #ac030366;
		--color-bg: #f9d395;
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
		background-color: var(--color-bg);
		background-size: 60%;
	}

	:global(::selection) {
		background-color: var(--color-link-fade);
	}

	nav {
		position: fixed;
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

	/* Reset font widths as the blackletter one will glitch with faux bold */
	:global(h1, h2, h3, h4, h5) {
		font-weight: normal;
	}
</style>
