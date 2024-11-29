<script lang="ts">
	import { type Snippet } from 'svelte';

	import { useEditor } from './hook.svelte';
	import { type SvelteLexicalConfig, defaults } from './state.svelte';

	const {
		children,
		config = defaults,
		debug = false
	}: {
		children: Snippet;
		config?: SvelteLexicalConfig;
		debug?: boolean;
	} = $props();

	const editor = useEditor(config);
</script>

{#if editor}
	<div class="svelte-lexical" use:editor.init>
		<!-- menus -->
		<menu class="sl-toolbar">
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
			<pre class="sl-debug">selection: {editor.selection.text ?? '<none>'}</pre>
			<pre class="sl-debug">{JSON.stringify(editor.content, null, 2)}</pre>
		{/if}
	</div>
{/if}
