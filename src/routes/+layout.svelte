<slot />
<nav>
	<ul>
		<li><a href="/">Now</a></li>
		<li><a href="/archive">All</a></li>
		<li><a href="/team">Team</a></li>
		<li class="special"><a href="/about">Why?</a></li>
		<li><a href="https://sonnet.io/posts/hi">Hi!</a></li>
	</ul>
</nav>
<footer><span>Made with 🐐 and </span><a href="https://sonnet.io">Rafal Pastuszak</a></footer>
<svelte:head>
	<title>Medieval News</title>
	<script
		async
		defer
		data-website-id="dcfdf23e-805d-4bec-a639-6c7335abfc7d"
		data-domains="readdeadpeople.com,www.readdeadpeople.com"
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

	@font-face {
		font-family: 'font-secondary';
		src: url('/fonts/secondary.woff2') format('woff2'), url('/fonts/secondary.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	:global(:root) {
		--font-family: 'font-default', serif;
		--font-family-drop-caps: 'font-drop-caps', serif;
		--font-family-secondary: 'font-secondary', serif;

		--font-size-xs: clamp(1rem, 0.2rem + 0.75vw, 1.5rem);
		--font-size-s: clamp(1rem, 0.3rem + 1vw, 2rem);
		--font-size-m: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		--font-size-l: clamp(2.5rem, 2.2993rem + 0.8451vw, 3.25rem);

		--color-text: #380e0e;
		--color-link: #ac0303;
		--color-link-fade: #ac030366;
		--color-bg: #f9d395;

		--page-margin-desktop: 5rem;
		--page-margin-mobile: 2rem;

		--page-margin: var(--page-margin-desktop);
	}

	@media all and (max-width: 400px) {
		:global(:root) {
			--page-margin: var(--page-margin-mobile);
		}
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
		left: var(--page-margin);
		bottom: var(--page-margin);

		font-family: var(--font-family);
		font-size: var(--font-size-m);
	}

	@media all and (max-width: 400px) {
		nav {
			bottom: calc(var(--page-margin) * 1.75);
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

	nav .special {
		animation: targetEnter 1.2s 3s both;
	}

	footer {
		position: fixed;
		right: 0;
		left: var(--page-margin);
		bottom: calc(var(--page-margin) * 0.25);

		font-family: var(--font-family-secondary);
		font-size: var(--font-size-xs);
	}

	footer span {
		opacity: 0.6;
	}

	footer a {
		color: #ac0303;
		text-decoration: none;
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	footer a:hover {
		text-decoration: underline;
		opacity: 1;
	}

	@keyframes targetEnter {
		from {
			transform: scale3d(1, 1, 1);
		}

		10%,
		20% {
			transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
		}

		30%,
		50%,
		70%,
		90% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
		}

		40%,
		60%,
		80% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
		}

		to {
			transform: scale3d(1, 1, 1);
		}
	}

	/* Reset font widths as the blackletter one will glitch with faux bold */
	:global(h1, h2, h3, h4, h5) {
		font-weight: normal;
	}
</style>
