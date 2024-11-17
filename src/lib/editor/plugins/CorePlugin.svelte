<script lang="ts">
	import { useEditor } from '../hook.svelte';

	import { Tool } from './lib';

	const editor = useEditor();

	editor.registerPlugin({ tools: [styleTool] });
</script>

{#snippet styleTool()}
	{#if !editor.mode}
		<Tool
			name="Bold"
			onclick={() => editor.format('bold')}
			--icon="var(--bold-icon)"
		/>
		<Tool
			name="Italic"
			onclick={() => editor.format('italic')}
			--icon="var(--italic-icon)"
		/>
	{/if}
{/snippet}
