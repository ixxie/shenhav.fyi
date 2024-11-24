import { setContext, getContext, hasContext } from 'svelte';

import { SvelteLexicalEditor } from './state.svelte';

export function useEditor() {
	let context: SvelteLexicalEditor;

	if (!hasContext('svelte-lexical-editor')) {
		context = new SvelteLexicalEditor({ log: true });
		setContext('svelte-lexical-editor', context);
	} else {
		context = getContext<SvelteLexicalEditor>('svelte-lexical-editor');
	}
	return context;
}
