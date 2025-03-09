<script lang="ts">
	import { Editor } from '$lib/editor/core';

	import Config from './Config.svelte';
	import MainToolbar from './MainToolbar.svelte';
	import HoverToolbar from './HoverToolbar.svelte';
</script>

<main>
	<Editor debug>
		<Config />
		{#snippet mainMenu(cmds)}
			<MainToolbar {cmds} />
		{/snippet}
		{#snippet hoverMenu(cmds)}
			<HoverToolbar {cmds} />
		{/snippet}
	</Editor>
</main>

<style>
	main {
		margin-top: 3rem;
		max-width: 60ch;
	}
</style>
