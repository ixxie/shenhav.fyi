<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';

	import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';

	import { Menu, mobileMenuOpen } from '$lib/menu';
	import { Scene } from '$lib/3D';

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

	const globalDelay = 100;

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

	// scroll based offsetting
	let scroll: Writable<number>;
	let offset = tweened(0, { duration: 1500, easing: cubicInOut });
	$: $offset = $scroll / innerHeight > 0.3 ? 20 : 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Coloring {pageIndex} {pageCount} bind:scroll>
	<div id="illustration">
		<Scene dolly={-$offset} file={currentPage.file} rotation={[0, 1, 0]} spin={currentPage.spin} />
	</div>
	<div id="container">
		<header in:fly={{ duration: 1000, delay: globalDelay, y: 100 }}>
			<Menu pages={['about', 'services', 'contact']} />
		</header>
		{#if !$mobileMenuOpen}
			<main>
				<div id="spacer" />
				<slot />
			</main>
			<Footer {currentPage} />
		{/if}
	</div>
	<div id="background" />
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

	#illustration {
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
	}

	#spacer {
		min-height: 30vh;
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

		main :global(section:first-of-type) :global(.illustration) {
			display: none;
		}
	}

	@media print {
		header {
			display: none;
		}

		:global(footer) {
			display: none !important;
		}

		#illustration {
			position: absolute;
			height: 90vh;
			width: 100%;
			margin-top: -20vh;
			margin-bottom: -10vh;
			z-index: -1;
		}
	}
</style>
