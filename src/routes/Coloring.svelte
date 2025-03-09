<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';

	// props
	let {
		children,
		pageIndex,
		pageCount
	}: {
		children: Snippet;
		pageIndex: number;
		pageCount: number;
	} = $props();

	// params
	const phase = 20;

	// helpers
	const mod = (n: number) => ((n % 360) + 360) % 360;
	const round = (n: number) => Math.round(n * 100) / 100;

	// store
	let color = tweened(phase + (pageIndex * 360) / pageCount, {
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

	let isColored = $state(true);

	// logic
	$effect(() => {
		$color = phase + (pageIndex * 360) / pageCount;
		isColored = pageIndex >= 0;
	});
	setContext('color', color);

	const bright = $derived(isColored ? '50%' : '0%');
	const dim = $derived(isColored ? '30%' : '0%');
	const background = $derived(isColored ? '90%' : '0%');

	const style = $derived(
		`--color: ${$color}; --bright: ${bright}; --dim: ${dim}; --background: ${background};`
	);

	let container: HTMLDivElement;
</script>

<div {style} bind:this={container}>
	{@render children()}
</div>

<style>
	/* 
    * Note: 
    *   this layout logic probably shouldn't be here
    *    but I couldn't find a better way
    */
	div {
		height: 100%;
		width: 100%;
		max-width: 100%;
		display: flex;
		justify-items: flex-start;
		justify-content: flex-start;
		overflow: overlay;
	}

	@media (max-width: 1800px) {
		div {
			place-content: center;
		}
	}

	:global(a),
	:global(h1),
	:global(h2) {
		color: hsl(var(--color), var(--bright), 20%);
	}

	:global(hgroup) :global(p) {
		color: hsl(var(--color), var(--dim), 40%);
	}

	:global(.quote) {
		color: hsl(var(--color), var(--bright), 30%);
	}

	:global(svg.picto) {
		fill: hsl(var(--color), var(--dim), 50%);
	}
</style>
