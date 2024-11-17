import * as core from 'lexical';

import {
	onMount,
	setContext,
	getContext,
	hasContext,
	type Snippet
} from 'svelte';
import { on } from 'svelte/events';
import type { Action } from 'svelte/action';

import { theme } from './lib/theme';

export interface EditorContext {
	instance?: core.LexicalEditor;
	state: {};
	selecting: boolean;
	root: Action;
	tools: Snippet[];
	mode: string | null;
	registerPlugin: (plugin: EditorPlugin) => void;
	format: (style: core.TextFormatType) => void;
	update: core.LexicalEditor['update'];
}

export interface EditorPlugin {
	tools?: Snippet[];
	nodes?: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[];
}

export function useEditor() {
	let context: EditorContext;

	if (!hasContext('editor')) {
		context = initEditorContext();
		setContext('editor', context);
	} else {
		context = getContext<EditorContext>('editor');
	}

	return context;
}

// CONTEXT

function initEditorContext() {
	// state
	let instance: core.LexicalEditor | undefined = $state.raw();
	let state: {} = $state({});
	let nodes: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[] =
		$state([]);
	let tools: Snippet[] = $state([]);
	let mode: string | null = $state(null);
	let selecting: boolean = $state(false);

	// listen to selections

	if (typeof window !== 'undefined') {
		on(document, 'selectionchange', () => {
			const selection = window?.getSelection();
			selecting = selection !== null && !selection.isCollapsed;
		});
	}

	const root = (node: HTMLElement) => {
		console.log('setting up');
		// init instance

		instance = core.createEditor({
			theme,
			editable: true,
			namespace: 'editor',
			nodes,
			onError: (error: Error) => {
				throw error;
			}
		});
		instance.registerUpdateListener(({ editorState }) => {
			state = editorState.toJSON();
		});

		// setup editable content

		const article = node.querySelector('article');
		if (article) {
			article.contentEditable = 'true';
			instance.setRootElement(article);
		}

		// setup toolbar

		const toolbar = node.querySelector('menu');
		if (toolbar) {
			console.log('toolbar');
			on(node, 'pointerup', () => {
				const { active, rect } = getSelection();
				if (active) {
					toolbar.style.display = 'flex';
					toolbar.style.top = `calc(${rect?.top}px - 45px)`;
					toolbar.style.left = `calc(${rect?.left}px + calc(${rect?.width}px / 2) - 40px)`;
				} else {
					toolbar.style.display = 'none';
				}
			});
			// deselect and hide toolbar on press
			on(document, 'pointerdown', () => {
				document.getSelection()?.removeAllRanges();
				toolbar.style.display = 'none';
			});
			// except when clicking the toolbar
			on(toolbar, 'pointerdown', (e) => {
				e.stopPropagation();
			});
		}
	};

	// api

	return {
		get instance() {
			return instance;
		},
		get root() {
			return root;
		},
		get state() {
			return state;
		},
		get selecting() {
			return selecting;
		},
		get tools() {
			return tools;
		},
		get mode() {
			return mode;
		},
		set mode(value) {
			mode = value;
		},
		registerPlugin(plugin: EditorPlugin) {
			console.log('registering plugin', plugin);
			tools.push(...(plugin?.tools ?? []));
			nodes.push(...(plugin?.nodes ?? []));
		},
		format: (style: core.TextFormatType) => {
			console.log('fmt');
			instance?.dispatchCommand(core.FORMAT_TEXT_COMMAND, style);
		},
		update: instance?.update ?? (() => {})
	};
}

// helpers

function getSelection() {
	const selection = window?.getSelection();
	let rect =
		(selection?.rangeCount ?? 0) > 0
			? selection?.getRangeAt(0)?.getBoundingClientRect()
			: null;
	const text = selection?.toString();
	const active = !selection?.isCollapsed;
	return {
		rect,
		text,
		active
	};
}
