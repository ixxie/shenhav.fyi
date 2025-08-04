<script lang="ts">
	import Growth from 'carbon-pictograms-svelte/lib/Growth.svelte';
	import Rocket from 'carbon-pictograms-svelte/lib/Rocket.svelte';
	import SocialWork_01 from 'carbon-pictograms-svelte/lib/SocialWork_01.svelte';
	import FlashingContent from 'carbon-pictograms-svelte/lib/FlashingContent.svelte';

	import { List } from '$lib/list';
	import { Article, Section } from '$lib/layout';
</script>

<Article>
	<Section Pictogram={FlashingContent} layout="right">
		<hgroup>
			<p>Hey there, my name is</p>
			<h1>Matan Bendix Shenhav</h1>
		</hgroup>
		<p>
			I'm a senior fullstack engineer: I've done <a href="/about"
				>a little bit of everything</a
			>
			in software engineering teams, and I pick up new skills quickly. I'm a good
			<a href="https://wildcardpeople.com/what-is-a-wildcard-person">wildcard</a
			>
			for small teams that demand adaptable members. Don't hesitate to
			<a href="/contact">get in touch</a> to ask questions or get a quote!
		</p>
	</Section>
</Article>
