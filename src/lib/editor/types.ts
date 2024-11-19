import * as core from 'lexical';

import type { Snippet } from 'svelte';
import type { Action } from 'svelte/action';

export interface EditorContext {
	init: Action;
	instance?: core.LexicalEditor;
	state: {};
	selecting: boolean;
	tools: Snippet[];
	mode: string | null;
	plugin: (plugin: EditorPlugin) => void;
	format: (style: core.TextFormatType) => void;
	update: core.LexicalEditor['update'];
}

export interface EditorPlugin {
	name: string;
	tools?: Snippet[];
	nodes?: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[];
	register?: (instance: core.LexicalEditor) => void;
}
