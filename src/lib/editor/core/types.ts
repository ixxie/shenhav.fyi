import * as core from 'lexical';

import type { Snippet } from 'svelte';

export interface SvelteLexicalPlugin {
	name: string;
	tools?: Snippet[];
	nodes?: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[];
	register?: (instance: core.LexicalEditor) => void;
}

export interface SvelteLexicalTheme {
	name: string;
	classes?: core.EditorThemeClasses;
}
