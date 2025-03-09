<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<menu class="sl-toolbar">
	{@render children()}
</menu>

<style>
	.sl-toolbar {
		height: 40px;
		/* appearance */
		cursor: pointer;
		background: white;
		border-radius: 1rem;
		padding: 0.35rem;
		/* layout */
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
