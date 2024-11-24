import * as core from 'lexical';

import type { Snippet } from 'svelte';
import type { Action } from 'svelte/action';

export interface SvelteLexicalContext {
	init: Action;
	instance?: core.LexicalEditor;
	content: {};
	selecting: boolean;
	tools: Snippet[];
	mode: string | null;
	plugin: (plugin: SvelteLexicalPlugin) => void;
	format: (style: core.TextFormatType) => void;
	update: core.LexicalEditor['update'];
}

export interface SvelteLexicalPlugin {
	name: string;
	tools?: Snippet[];
	nodes?: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[];
	register?: (instance: core.LexicalEditor) => void;
}
