<script lang="ts">
	import { setContext } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, sineInOut } from 'svelte/easing';

	// props
	export let pageIndex: number;
	export let pageCount: number;

	// params
	const phase = 20;

	// helpers
	const mod = (n: number) => ((n % 360) + 360) % 360;
	const round = (n: number) => Math.round(n * 100) / 100;

	// store
	const color = tweened(phase + (pageIndex * 360) / pageCount, {
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

	// logic
	$: $color = phase + (pageIndex * 360) / pageCount;
	$: style = `--color: ${$color};`;
	setContext('color', color);

	let container: HTMLDivElement;
	export const scroll = tweened(0, { duration: 1000, easing: cubicInOut });

	function getScroll() {
		$scroll = container.scrollTop;
	}
</script>

<div {style} bind:this={container} on:scroll={getScroll}>
	<slot />
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
		color: hsl(var(--color), 50%, 20%);
	}

	:global(hgroup) :global(p) {
		color: hsl(var(--color), 30%, 40%);
	}

	:global(.quote) {
		color: hsl(var(--color), 50%, 30%);
	}

	:global(svg.picto) {
		fill: hsl(var(--color), 30%, 50%);
	}
</style>
