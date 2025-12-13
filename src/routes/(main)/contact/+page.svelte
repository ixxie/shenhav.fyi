<script lang="ts">
	import Mail from '$lib/sketches/Mail.svelte';

	import Email from '$lib/Email.svelte';
	import { Article, Section } from '$lib/layout';
</script>

<Article>
	<Section Pictogram={Mail} layout="right">
		<hgroup>
			<p>contact</p>
			<h1>Let's Get In Touch</h1>
		</hgroup>
		<p>Wanna chat? Hit me up!</p>
		<p>
			Feel free to drop me an email at <Email />, I tend to be quite responsive. I'm also on
			<a aria-label="discord" title="discord" href="https://discordapp.com/users/611892156197765160"
				>Discord</a
			>
			daily
		</p>
		<p>
			You can also find me on
			<a href="https://www.linkedin.com/in/matan-shenhav/">linkedin</a>
			and
			<a href="https://github.com/ixxie">github</a> if that's your sort of thing.
		</p>
	</Section>
</Article>
