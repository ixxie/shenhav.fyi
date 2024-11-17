import * as core from 'lexical';

import { setContext, getContext, hasContext, type Snippet } from 'svelte';
import { on } from 'svelte/events';
import type { Action } from 'svelte/action';

import { theme } from './lib/theme';

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
	let state: {} = $state.raw({});
	let nodes: (core.Klass<core.LexicalNode> | core.LexicalNodeReplacement)[] =
		$state([]);
	let tools: Snippet[] = $state([]);
	let mode: string | null = $state(null);
	let selecting: boolean = $state(false);

	// listen to selections

	const init = (node: HTMLElement) => {
		console.info('setting up editor');
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

		// listen to selection changes

		on(document, 'selectionchange', () => {
			const selection = window?.getSelection();
			selecting = selection !== null && !selection.isCollapsed;
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
		init,
		get instance() {
			return instance;
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
		plugin(plugin: EditorPlugin) {
			console.info(`Registering plugin ${plugin.name}`);
			tools.push(...(plugin?.tools ?? []));
			nodes.push(...(plugin?.nodes ?? []));
			if (plugin?.register) {
				$effect(() =>
					instance && plugin.register ? plugin.register(instance) : () => {}
				);
			}
		},
		format: (style: core.TextFormatType) =>
			instance?.dispatchCommand(core.FORMAT_TEXT_COMMAND, style),
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
