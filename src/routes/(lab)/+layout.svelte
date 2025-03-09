<script lang="ts">
	import { page } from '$app/stores';
	import { onNavigate, beforeNavigate } from '$app/navigation';

	import type { Snippet } from 'svelte';
	import type { BeforeNavigate } from '@sveltejs/kit';

	import '../app.css';
	import Coloring from '../Coloring.svelte';

	const {
		children
	}: {
		children: Snippet;
	} = $props();

	// page data
	const pageNames = ['home', 'about', 'services', 'contact'];
	const route = $derived($page.route.id?.replace('/(site)', '') ?? '/');
	const current = $derived(route == '/' ? 'home' : route.substring(1));
	const pageIndex = $derived(pageNames.indexOf(current));
	const pageCount = pageNames.length;

	let innerWidth: number | undefined = $state();
	let innerHeight: number | undefined = $state();

	// trigger for navigation transition
	let target: string | null | undefined = null;
	beforeNavigate(async (navigation: BeforeNavigate) => {
		if (target == navigation.to?.route.id) {
			navigation.cancel();
		}
	});
	onNavigate((navigation) => {
		target = navigation.to?.route.id;
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Coloring {pageIndex} {pageCount}>
	<div id="container">
		{@render children()}
		<div class="background">
			<div id="stripes"></div>
			<div id="noise"></div>
			<div id="color"></div>
		</div>
	</div>
</Coloring>

<style>
	#container {
		min-height: 100%;
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		scrollbar-gutter: stable;
	}

	#container :global(*) {
		opacity: 0.98;
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

	.background {
		isolation: isolate;
	}

	.background,
	.background > * {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -100;
		width: 100vw;
		height: 100vh;
	}

	#stripes {
		background: repeating-linear-gradient(
			-45deg,
			hsl(0, 0%, 90%),
			hsl(0, 0%, 90%) 3px,
			hsl(0, 0%, 95%) 3px,
			hsl(0, 0%, 95%) 6px
		);
		z-index: -100;
		opacity: 0.3;
		mix-blend-mode: luminosity;
	}

	#noise {
		background: radial-gradient(
				ellipse at bottom left,
				rgb(49, 49, 49),
				transparent
			),
			radial-gradient(ellipse at top right, rgb(49, 49, 49), transparent),
			url(/images/noise.svg);
		filter: contrast(200%) brightness(1000%);
		opacity: 0.15;
		mix-blend-mode: multiply;
		z-index: -200;
	}

	#color {
		background: radial-gradient(
				ellipse at bottom right,
				hsl(var(--color), var(--background), 90%),
				transparent
			),
			radial-gradient(
				ellipse at top left,
				hsl(var(--color), var(--background), 95%),
				transparent
			),
			white;
		z-index: -300;
	}
</style>
