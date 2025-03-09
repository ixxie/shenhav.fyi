<script lang="ts">
	import { type Snippet } from 'svelte';

	import { useEditor } from './hook.svelte';
	import { type SvelteLexicalConfig, defaults } from './state.svelte';

	const {
		children,
		config = defaults,
		debug = false,
		mainMenu,
		hoverMenu
	}: {
		children: Snippet;
		config?: SvelteLexicalConfig;
		debug?: boolean;
		mainMenu?: Snippet<[{}]>;
		hoverMenu?: Snippet<[{}]>;
	} = $props();

	const editor = useEditor(config);
</script>

{#if editor}
	<div class="svelte-lexical" use:editor.init>
		<!-- menus -->
		<div id="sl-main-menu">
			{@render mainMenu?.(editor.commands)}
		</div>
		<div id="sl-hover-menu">
			{@render hoverMenu?.(editor.commands)}
		</div>
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
