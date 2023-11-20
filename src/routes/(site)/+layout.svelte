<script lang="ts">
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { BeforeNavigate, NavigationTarget } from '@sveltejs/kit';

	import { Menu, mobileMenuOpen } from '$lib/menu';
	import { Scene } from '$lib/3D';

	import './app.css';

	import { pages } from './pages';

	import Coloring from './Coloring.svelte';
	import Footer from './Footer.svelte';
	import type { Tweened } from 'svelte/motion';

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
		target = navigation.to?.route.id;
		await new Promise((r) => setTimeout(r, 1000));
	});

	// trigger for initial trasition
	let ready = false;
	onMount(() => (ready = true));

	let scroll: Tweened<number>;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Coloring {pageIndex} {pageCount} bind:scroll>
	<div id="illustration">
		<Scene
			offset={(30 * $scroll) / innerHeight}
			file={currentPage.file}
			rotation={[0, 1, 0]}
			spin={currentPage.spin}
		/>
	</div>
	<div id="container">
		{#if ready}
			<header in:fly={{ duration: 1000, delay: 0, y: -100 }}>
				<Menu pages={['about', 'services', 'contact']} />
			</header>
			{#if !$mobileMenuOpen}
				<main>
					<div id="spacer" />
					{#key target}
						<article
							in:fly={{ duration: 1000, delay: 1000, y: 100 }}
							out:fly={{ duration: desktop ? 1000 : 0, y: 100 }}
						>
							<slot />
						</article>
					{/key}
				</main>
				<Footer {currentPage} />
			{/if}
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

		#cover {
			position: absolute;
			display: block;
			width: 100%;
			height: 100%;
			z-index: 1;
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
