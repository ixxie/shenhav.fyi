<script lang="ts">
	import Envelope from 'carbon-pictograms-svelte/lib/Envelope.svelte';

	import Email from '$lib/Email.svelte';
	import { Article, Section } from '$lib/layout';
</script>

<Article>
	<Section pictogram={Envelope} layout="left" large>
		<hgroup>
			<p>Contact</p>
			<h1>Let's Get In Touch</h1>
		</hgroup>
		<p>
			Want a quote, or just have a question? Feel free to drop me an email at <Email /> or fill the form
			below and I will usually respond within 24h. You can also find me on
			<a href="https://www.linkedin.com/in/matan-shenhav/">linkedin</a>
			and
			<a href="https://github.com/ixxie">github</a>.
		</p>
	</Section>
</Article>
