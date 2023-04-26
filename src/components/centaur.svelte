<a class="centaur" href="https://sonnet.io/">
	<img src="/centaur.png" alt="a centaur" />
</a>

<style>
	.centaur {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 10vw;
		vertical-align: bottom;
		transition: scale 0.2s;
	}

	.centaur:hover {
		scale: 1.05;
	}

	.centaur:active {
		scale: 1;
	}

	@media all and (max-width: 400px) {
		.centaur {
			width: 30vw;
			z-index: -1;
		}
	}

	.centaur img {
		width: 100%;
		height: auto;
	}
</style>
