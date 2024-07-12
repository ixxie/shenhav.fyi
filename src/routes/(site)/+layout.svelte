<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';

	import { Menu, mobileMenuOpen } from '$lib/menu';
	import './app.css';

	import { pages } from './pages';

	import Coloring from './Coloring.svelte';
	import Footer from './Footer.svelte';

	// page data
	const pageNames = Object.keys(pages);
	$: route = $page.route.id?.replace('/(site)', '') ?? '/';
	$: current = route == '' ? 'home' : route.substring(1);
	$: currentPage = pages[current];
	$: pageIndex = pageNames.indexOf(current);
	const pageCount = pageNames.length;

	let innerWidth: number;
	let innerHeight: number;

	// mobile menu logic
	$: desktop = innerWidth > 780;
	$: $mobileMenuOpen = desktop ? false : $mobileMenuOpen;

	// trigger for navigation transition
	let target: string | null | undefined = null;
	beforeNavigate(async (navigation: BeforeNavigate) => {
		if (target == navigation.to?.route.id) {
			navigation.cancel();
		}
	});
	afterNavigate(async (navigation: AfterNavigate) => {
		target = navigation.to?.route.id;
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Coloring {pageIndex} {pageCount}>
	<div id="container">
		<header>
			<Menu pages={['about', 'services', 'contact']} />
		</header>
		<main class:deactivate={$mobileMenuOpen}>
			<slot />
		</main>
		<Footer {currentPage} />
	</div>
	<div id="background"></div>
</Coloring>

<style>
	#container {
		max-width: 1100px;
		min-height: 100%;
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		padding-left: 100px;
	}

	main {
		margin: 0 2rem 5rem 2rem;
		flex-grow: 1;
	}


	#background {
		background: repeating-linear-gradient(
			-45deg,
			hsl(var(--color), 50%, 90%),
			hsl(var(--color), 50%, 90%) 3px,
			hsl(var(--color), 50%, 91%) 3px,
			hsl(var(--color), 50%, 91%) 6px
		);
		position: fixed;
		top: 0;
		left: 0;
		z-index: -100;
		width: 100vw;
		height: 100vh;
	}

	@media (max-width: 1800px) {
		#container {
			padding: 0;
		}
	}

	@media (max-width: 1100px) {
		#container {
			width: 100%;
			max-width: 100%;
		}
	}

	@media (max-width: 700px) {
		header {
			height: 100%;
		}

		main {
			margin: 0;
		}
	}

	@media print {
		header {
			display: none;
		}

		:global(footer) {
			display: none !important;
		}
	}
</style>
