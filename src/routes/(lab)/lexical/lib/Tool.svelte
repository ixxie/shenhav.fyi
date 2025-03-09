<script lang="ts">
	import type { Tool } from './types';

	const { name, onclick }: Tool = $props();
</script>

<button class="sl-tool" {onclick} aria-label={name}>
	<div class="sl-icon" style="var(--sl-icon)"></div>
</button>

<style>
	.sl-tool {
		border: none;
		background: white;
		padding: 0.2rem;
		font-weight: bold;
		border-radius: 1rem;
	}

	.sl-icon {
		width: var(--sl-icon-size, 1rem);
		height: var(--sl-icon-size, 1rem);
		mask: var(--sl-icon) center/100%;
		background-color: var(--sl-icon-color, #222);
	}
</style>
