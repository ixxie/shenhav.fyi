<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import { color } from '$lib/stores';
	import { Menu, mobileMenuOpen } from '$lib/menu';

	import '../app.css';

	afterNavigate(({ to }) => {
		const routeId = to?.route.id ?? '/';
		$color = routeId == '/' ? 'home' : routeId.substring(1);
	});

	$: style = `--color: var(--${$color});`;

	let innerWidth: number;
	$: desktop = innerWidth > 780;
	$: $mobileMenuOpen = desktop ? false : $mobileMenuOpen;
</script>

<svelte:window bind:innerWidth />

<div class="container" {style}>
	<div class="content">
		<Menu />
		{#if !$mobileMenuOpen}
			<slot />
		{/if}
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		height: 100%;
		min-width: 100vw;
		max-width: 100%;
		background: hsl(var(--color), 50%, 90%) url('/craft-bg.png');
		transition: background 1s ease-in-out;
		background-blend-mode: overlay;
		display: flex;
		justify-items: flex-start;
		justify-content: center;
	}

	.content {
		max-width: 800px;
		min-height: 100%;
		overflow-y: auto;
		padding: 1em 1em 2em 1em;
		flex-grow: 1;
	}

	.container :global(h1),
	:global(h2),
	:global(h3),
	:global(a) {
		color: hsl(var(--color), 40%, 20%) !important;
		transition: color 1s ease-in-out;
	}
</style>
