<script lang="ts">
	import ArticleContainter from '../../components/article-containter.svelte';
</script>

<ArticleContainter size="fixed">
	<div class="container">
		<h1>Hi</h1>

		<p>
			Welcome to my (Medieval) Content Farm! We're a <em>biased</em> and <em>hallucinated</em>
			source of news curated by a team of our talented writers. Every day they scour the internet for
			the most interesting and relevant events of the realm. Meet the team
			<a href="/team">here</a>. They're a cookie bunch.
		</p>

		<p>
			Are they real? Nothing is real! <a href="https://rafal.ck.page/products/tip"
				>Money isn't real.</a
			>
		</p>

		<h2>Why?</h2>

		<p>
			Adtech and advertising-driven social media in the past decade has shown us that manipulation
			at scale is easy. Almost every nook and corner of the web tries to extract value from you in
			one way or another. This is done by stealing your attention, or tricking your bullshit filters
			so eventually you'll prefer Pepsi over Coke, the Political Brain Parasite #1 over the
			Political Parasite #2...
		</p>

		<aside>
			(Advertisers like to say that they sponsor the web for us, when in reality they're keeping it
			hostage.)
		</aside>
		<p>
			We're worried that with the advent of Large Language Models we'll get flooded with
			plausible-sounding bot-generated content. That seems to be likely. Then, Large Language Models
			are pretty good at mimicking style and creating an idea of credibility.
		</p>

		<p>
			To be honest with you, when I put these things together, I get a bit anxious. And when I feel
			anxious I like to turn the scary ideas on their head.
		</p>
		<p>I like turning problems into advantages.</p>
		<p>I love making <a href="https://sonnet.io/posts/reactive-hole/">toys</a></p>
		<p>I love late medieval art</p>
		<p>I'm a <a href="https://sonnet.io/posts/hummingbirds/">hummingbird</a></p>

		<hr />
		ORRRRRR
		<hr />
		<h3>Short version</h3>
		<p>
			LLMs are powerful, but I'm tired of the VC driven hype, making us collecively stupid, and:
		</p>
		<p>I like turning problems into advantages.</p>
		<p>I love making <a href="https://sonnet.io/posts/reactive-hole/">toys</a></p>
		<p>I love late medieval art</p>
		<p>I'm a <a href="https://sonnet.io/posts/hummingbirds/">hummingbird</a></p>
		<h3>Longer version</h3>
		<p>
			Large Language Models (LLMs) excel at creating plausible sounding bullshit. They are also very
			good at generating text that is similar to the training data. The might be able to generalise
			to other domains and create an illusion of realism, bypassing our bullshit filters, slowly
			shifting our opinions to prefer Pepsi over Coke. However, LLMs don't really understand what
			they say in the same way as humans do. They are not able to make sense of the world since
			their main job is to find a sequence of words following your prompt.
		</p>

		<p>
			All of that makes scaling up botnets and troll farms easier than ever before. And, the past 10
			years have shown us that shifting public opinions algorithmically via social media is not that
			hard.
		</p>

		<p>
			This is terrible for a variety of reasons. But one of the things I enjoy the most is flipping
			problems on their heads and turning them into solutions (or toys!).
		</p>
		<p>
			As I kid I was afraid of ghosts so I found a cheap camera and started photographing
			cemeteries. 20 years later, I've seen 100+ locations, and now I see them as the most beautiful
			and alive places you can find. When I worked in ad-tech I managed to build a system turning
			our ad exchange into an adblocker where users could pay the publishers directly with money
			instead of frying their neurons. Uncle Murdock paid for that, which is probably the only thing
			from those times I'm proud of.
		</p>
	</div>
</ArticleContainter>

<style>
	.container {
		display: contents;
		font-family: var(--font-family-secondary);
		line-height: 1.2;
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

	a {
		color: var(--color-link);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
