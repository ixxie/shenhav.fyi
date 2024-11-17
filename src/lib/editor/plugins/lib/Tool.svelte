<script lang="ts">
	import type { Tool } from './types';

	const { name, onclick }: Tool = $props();
</script>

<button {onclick} aria-label={name}>
	<div class="icon" style="var(--icon)"></div>
</button>

<style>
	button {
		border: none;
		background: white;
		padding: 0.2rem;
		font-weight: bold;
		border-radius: 1rem;
	}
</style>
