<script lang="ts">
	import { type Snippet } from 'svelte';

	import { useEditor } from './hook.svelte';

	const { children, debug = false }: { children: Snippet; debug?: boolean } =
		$props();

	const editor = useEditor();
</script>

{#if editor}
	<div class="svelte-lexical" use:editor.init>
		<!-- hover toolbar -->
		<menu class="sl-hoverbar">
			{#each editor.tools as tool}
				{@render tool()}
			{/each}
		</menu>
		<!-- content -->
		<article class="sl-content"></article>
		<!-- plugins & themes -->
		{@render children()}
		<!-- debugger -->
		{#if debug}
			<pre class="sl-debug">selection: {editor.selection.active
					? editor.selection.text
					: '<none>'}</pre>
			<pre class="sl-debug">{JSON.stringify(editor.content, null, 2)}</pre>
		{/if}
	</div>
{/if}

<style>
	.sl-hoverbar {
		position: absolute;
		z-index: 999;
	}
</style>
