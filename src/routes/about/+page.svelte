<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';
	import Centaur from '../../components/centaur.svelte';
</script>

<ArticleContainter size="fixed">
	<div class="container">
		<h1>Hi!</h1>

		<p class="intro">
			<a href="https://sonnet.io" target="_blank">Rafal</a> here. Welcome to my (Medieval) Content
			Farm! We're a biased and hallucinated news source curated by a team of talented writers. Every
			day they scour the internet for the most interesting and relevant events of the realm. Meet
			the team <a href="/team">here</a>. They're a kooky bunch.
			<br /><br />
			Are they real? Nothing is real!
			<a href="https://rafal.ck.page/products/tip">Money isn't real</a>.
		</p>

		<h2>Why?</h2>

		<p>
			Because of the love triangle between publishing, advertising and bullshit (and me poorly
			coping with either).
		</p>

		<p class="centered">
			<img src="/sun-moon.webp" class="sun-moon" alt="Medieval illustration of Sun and Moon" />
		</p>

		<p>
			Over the past decade, adtech and advertising-driven social media have shown us just how easy
			manipulation at scale can be. And, if we’ve learned anything from the mid-2010s social media
			boom, it’s that shifting public opinion algorithmically is a piece of cake. Almost every nook
			and corner of the web tries to extract value from you in one way or another, either by
			stealing your attention, or tricking your bullshit filters so eventually you'll prefer Pepsi
			over Coke, Political Brain Parasite #1 over Political Brain Parasite #2, and so on…
		</p>

		<blockquote>
			Advertisers like to say they’re sponsoring the web for us, when in reality they're keeping it
			hostage (just look at the faces of breadtube channel owners pitching NordVPN–they’re not doing
			well)
		</blockquote>

		<p>
			Incidentally, Large Language Models, despite their many advantages, are also a perfect
			candidate for scaling up and lowering the cost of mass manipulation.
		</p>

		<p>
			They tend to hallucinate their responses and probably have no understanding of the world
			around them, as human language captures only a tiny fraction of reality. However, what they
			excel at is mimicking style, repackaging existing textual content and creating
			plausible-sounding bullshit. This might sound horrible to you, but I can guarantee you that
			somewhere a PM is pitching it to someone as a net positive, with a straight face, licking
			their lips, thinking about the blood boys and egg white baths they’ll be able to afford. If
			they could blink, their eyes would emit a quiet Ka-Ching!...
		</p>

		<p>
			Where was I… Ah, to be honest with you, when I put these things together, I get anxious. And,
			when I get anxious I like to turn the scary ideas on their head. So, the short answer to why
			the Editorial Team is working day and night, is that:
		</p>

		<ul>
			<li>I learned to stop worrying and learned to love the farm</li>
			<li>I like turning problems into advantages</li>
			<li>
				I love <a href="https://sonnet.io/posts/reactive-hole/" target="_blank">making toys</a>
			</li>
			<li>
				I love late <a
					href="https://twitter.com/rafalpast/status/1079109502358745088"
					target="_blank">medieval art</a
				>
			</li>
			<li>
				And I'm a <a href="https://sonnet.io/posts/hummingbirds" target="_blank">hummingbird</a>
			</li>
		</ul>

		<p>
			You can read the Reptilian friendly version of the article <a
				href="https://gist.github.com/paprikka/2a8678fccd516bdaa44c8cd3c6b6a89b"
				target="_blank">here</a
			>.
		</p>
	</div>
</ArticleContainter>
<Centaur />

<style>
	.container {
		display: contents;
		font-family: var(--font-family-secondary);
		line-height: 1.2;
		font-size: var(--font-size-s);
	}

	@media all and (max-width: 420px) {
		.container {
			font-size: var(--font-size-m);
		}
	}

	.container::after {
		content: '';
		position: relative;
		left: calc(var(--page-margin) * -1);
		width: 40%;
		display: block;
		background: url('/about-header.png');
		background-size: contain;
		background-repeat: no-repeat;
		aspect-ratio: 7/5;
	}

	p.intro {
		font-size: var(--font-size-m);
	}

	p:not(.intro) {
		max-width: 40rem;
	}

	a {
		color: var(--color-link);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	blockquote {
		max-width: 30rem;
		opacity: 0.7;
	}

	p.centered {
		text-align: center;
	}

	p img {
		width: 15rem;
		max-width: 100%;
		height: auto;
	}
</style>
