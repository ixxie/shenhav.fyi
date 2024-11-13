<script lang="ts">
	import type { TextFormatType } from 'lexical';

	import { useEditor } from './hook.svelte';

	const { debug = false } = $props();

	const editor = useEditor();
</script>

<div use:editor.pad>
	<menu>
		{#each ['bold', 'italic'] as style}
			{@render button(style as TextFormatType, style)}
		{/each}
	</menu>
	<article>
		<!-- content -->
	</article>
</div>

{#if debug}
	<pre>{JSON.stringify(editor.state, null, 2)}</pre>
{/if}

{#snippet button(style: TextFormatType, icon: string)}
	<button
		onclick={() => {
			editor.format(style);
			console.log(style);
		}}
	>
		{icon}
	</button>
	<style>
		button {
			border: none;
			background: white;
			padding: 0.5rem;
			font-weight: bold;
			border-radius: 1rem;
		}
	</style>
{/snippet}

<style>
	article {
		margin-top: 3rem;
		max-width: 60ch;
	}

	menu {
		position: absolute;
		height: 40px;
		/* appearance */
		cursor: pointer;
		background: white;
		border-radius: 1rem;
		padding: 0.5rem;
		/* layout */
		display: none;
		flex-flow: row;
		align-items: center;
		justify-content: space-around;
		z-index: 100;
	}

	pre {
		font-size: smaller;
	}
</style>
