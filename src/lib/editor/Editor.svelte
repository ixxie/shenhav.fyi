<script lang="ts">
	import { type Snippet } from 'svelte';

	import './lib/theme.css';
	import './lib/icons.css';

	import { useEditor } from './hook.svelte';

	const { children, debug = false }: { children: Snippet; debug?: boolean } =
		$props();

	const editor = useEditor();
</script>

{#if editor}
	<div id="svelte-lexical-editor" use:editor.init>
		<menu id="svelte-lexical-toolbar">
			{#each editor.tools as tool}
				{@render tool()}
			{/each}
		</menu>
		<article id="svelte-lexical-content">
			<!-- content -->
		</article>
		{@render children()}
	</div>
{/if}

{#if debug}
	<pre>selection: {editor.selection.active
			? editor.selection.text
			: '<none>'}</pre>
	<pre>{JSON.stringify(editor.content, null, 2)}</pre>
{/if}

<style>
	article {
		margin-top: 3rem;
		max-width: 60ch;
		min-height: 10rem;
	}

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

	pre {
		font-size: smaller;
	}
</style>
