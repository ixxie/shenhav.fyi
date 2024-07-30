<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Menu } from '$lib/menu';
	import { blur } from '$lib/blur';

	import Footer from './Footer.svelte';

	const {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<article in:blur={{ delay: 600 }} out:blur={{ delay: 0 }}>
	<header>
		<Menu pages={['about', 'services', 'contact']} />
	</header>
	<main>
		{@render children()}
	</main>
	<Footer />
</article>

<style>
	article {
		margin: 0 !important;
	}

	main {
		margin: 0 2rem 5rem 2rem;
		flex-grow: 1;
	}

	@media (max-width: 700px) {
		main {
			margin: 0;
		}
	}
</style>
