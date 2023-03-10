<script lang="ts">
	import { setContext } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';

	import { Menu, mobileMenuOpen } from '$lib/menu';

	import { Scene } from '$lib/3D';

	import { page } from '$app/stores';

	import '../app.css';

	const mod = (n: number) => ((n % 360) + 360) % 360;
	const round = (n: number) => Math.round(n * 100) / 100;
	const color = tweened(0, {
		duration: 2000,
		easing: sineInOut,
		interpolate: (from, to) => {
			const direct = Math.abs(to - from);
			const indirect = 360 - direct;
			if (direct < indirect) {
				return (t) => round(from + t * (to - from));
			} else {
				const sign = -(to - from) / direct;
				return (t) => round(mod(from + sign * t * indirect));
			}
		}
	});
	setContext('color', color);

	const phase = 20;
	const pages = ['home', 'about', 'services', 'contact'];

	$: route = $page.route.id ?? '/';
	$: current = route == '/' ? 'home' : route.substring(1);
	$: index = pages.indexOf(current);
	$: $color = phase + (index * 360) / pages.length;

	$: style = `--color: ${$color};`;

	let innerWidth: number;
	$: desktop = innerWidth > 780;
	$: $mobileMenuOpen = desktop ? false : $mobileMenuOpen;

	const models = {
		home: {
			file: 'lighthouse.glb',
			rotation: [0, 1, 0],
			spin: [0, 1, 0]
		},
		about: {
			file: 'swissknife.glb',
			rotation: [-0.5, 0, 0],
			spin: [0, 1, 0]
		},
		services: {
			file: 'rocket.glb',
			rotation: [0, -Math.PI / 2, Math.PI / 4],
			spin: [0, 1, 0]
		},
		contact: {
			file: 'computer.glb',
			spin: [0, 1, 0]
		}
	};
</script>

<svelte:window bind:innerWidth />

<div id="content" {style}>
	<header>
		<Menu pages={['about', 'services', 'contact']} />
	</header>
	{#if !$mobileMenuOpen}
		<main>
			<slot />
		</main>
	{/if}
</div>
<div id="background" {style} />
<div id="illustration">
	{#each pages as page}
		{#if page == current}
			{@const props = models[page]}
			<Scene {...props} />
		{/if}
	{/each}
</div>

<style>
	:global(body) {
		height: 100%;
		width: 100%;
		max-width: 100%;
		display: flex;
		justify-items: flex-start;
		justify-content: flex-start;
		overflow: overlay;
	}

	#content {
		max-width: 1100px;
		min-height: 100%;
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		padding-left: 100px;
	}

	main {
		margin: 0 2rem 10rem 2rem;
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
		z-index: -100;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
	}

	#illustration {
		position: fixed;
		right: 0;
		top: 0;
		width: calc(100vw - 1100px);
		height: 100vh;
		z-index: -99;
	}

	@media (max-width: 1800px) {
		:global(body) {
			justify-content: center;
		}

		#content {
			padding: 0;
		}

		#illustration {
			width: 100%;
			opacity: 0.5;
		}
	}
	@media (max-width: 1100px) {
		#content {
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
	}

	:global(a),
	:global(h1),
	:global(h2) {
		color: hsl(var(--color), 50%, 20%);
	}

	:global(.quote) {
		color: hsl(var(--color), 50%, 30%);
	}

	:global(svg.picto) {
		fill: hsl(var(--color), 30%, 50%);
	}

	:global(::-webkit-scrollbar) {
		width: 6px;
		background: transparent;
	}

	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: rgb(100, 100, 100, 0.4);
		border-radius: 3px;
	}
</style>
