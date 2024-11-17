<script lang="ts">
	import { type Snippet, onMount } from 'svelte';

	import './lib/theme.css';
	import './lib/icons.css';

	import { useEditor } from './hook.svelte';

	const { children, debug = false }: { children: Snippet; debug?: boolean } =
		$props();

	const editor = useEditor();

	onMount(() => editor.init());
</script>

{#if editor.instance}
	<div use:editor.root>
		<menu id="toolbar">
			{#each editor.tools as tool}
				{@render tool()}
			{/each}
		</menu>
		<article>
			<!-- content -->
		</article>
		{@render children()}
	</div>
{/if}

{#if debug}
	<pre>{JSON.stringify(editor.state, null, 2)}</pre>
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
