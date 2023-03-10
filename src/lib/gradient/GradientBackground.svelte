<script>
	import { onMount } from 'svelte';
	import { Gradient } from './minigl';

	const gradient = new Gradient();

	onMount(() => {
		gradient.initGradient('#gradient-canvas');
	});
</script>

<canvas id="gradient-canvas" />

<style>
	#gradient-canvas {
		position: fixed;
		z-index: -100;
		width: 100vw;
		height: 100vh;
	}
</style>
