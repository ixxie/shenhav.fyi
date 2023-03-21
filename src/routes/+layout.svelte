<script lang="ts">
	import { page } from '$app/stores';

	import { Menu, mobileMenuOpen } from '$lib/menu';
	import { Scene } from '$lib/3D';

	import '../app.css';

	import { pages } from './pages';

	import Coloring from './Coloring.svelte';
	import Footer from './Footer.svelte';

	// page data
	const pageNames = Object.keys(pages);
	$: route = $page.route.id ?? '/';
	$: current = route == '/' ? 'home' : route.substring(1);
	$: currentPage = pages[current];
	$: pageIndex = pageNames.indexOf(current);
	const pageCount = pageNames.length;

	// mobile menu logic
	let innerWidth: number;
	$: desktop = innerWidth > 780;
	$: $mobileMenuOpen = desktop ? false : $mobileMenuOpen;
</script>

<svelte:window bind:innerWidth />

<Coloring {pageIndex} {pageCount}>
	<div id="container">
		<header>
			<Menu pages={['about', 'services', 'contact']} />
		</header>
		{#if !$mobileMenuOpen}
			<main>
				<div id="illustration">
					{#each pageNames as page}
						{#if page == current}
							{@const props = currentPage}
							<Scene {...props} />
						{/if}
					{/each}
				</div>
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
		position: fixed;
		right: 0;
		top: 0;
		width: calc(100vw - 1100px);
		height: 100vh;
		z-index: 10;
	}

	@media (max-width: 1800px) {
		#container {
			padding: 0;
		}

		#illustration {
			position: static;
			height: 90vh;
			width: 100%;
			margin-top: -20vh;
			margin-bottom: -10vh;
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
			padding: 1rem;
		}

		#illustration {
			margin-top: -10vh;
			margin-bottom: -30vh;
			z-index: -1;
		}

		main :global(section:first-of-type) :global(.illustration) {
			display: none;
		}
	}
</style>
