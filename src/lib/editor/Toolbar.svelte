<script lang="ts">
	import { setContext } from 'svelte';

	import { BoldTool, ItalicTool, LinkTool } from './tools';

	let context = $state({ mode: null });
	setContext('toolbar', context);
</script>

<menu id="toolbar">
	<BoldTool />
	<ItalicTool />
	<LinkTool />
</menu>

<style>
	menu {
		position: absolute;
		height: 40px;
		/* appearance */
		cursor: pointer;
		background: white;
		border-radius: 1rem;
		padding: 0.35rem;
		/* layout */
		display: none;
		flex-flow: row;
		align-items: center;
		justify-content: space-around;
		z-index: 999;
	}
</style>
