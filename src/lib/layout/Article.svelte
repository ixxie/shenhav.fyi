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
		<Menu pages={['about', 'contact']} />
	</header>
	<main>
		{@render children()}
	</main>
	<Footer />
</article>

<style>
	article {
		margin: 0 !important;
		min-height: 100%;
		display: flex;
		flex-direction: column;

		:global(*) {
			opacity: 0.95;
		}

		main {
			margin: 0 2rem 5rem 2rem;
			flex-grow: 1;

			:global(*) {
				opacity: 0.95;
			}

			:global(section:has(h1):not(:first-of-type)) {
				border-top: 1px solid color-mix(in srgb, currentColor 30%, transparent);
				padding-top: 3rem;
			}
		}

		header {
			@media print {
				display: none;
			}
		}
	}
</style>
