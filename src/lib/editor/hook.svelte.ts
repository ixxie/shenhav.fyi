import * as core from 'lexical';

import { setContext, getContext, hasContext, type Snippet } from 'svelte';
import { on } from 'svelte/events';

import { theme } from './lib/theme';
import type { EditorContext, EditorPlugin } from './types';

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
	let toolbar = $state();
	let tools: Snippet[] = $state([]);
	let mode: string | null = $state(null);
	let selecting: boolean = $state(false);

	$effect(() => {
		if (mode) {
			instance?.setEditable(false);
		} else {
			instance?.setEditable(true);
		}
	});
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

		const menu = node.querySelector('menu');
		if (menu) {
			const show = () => {
				const { rect } = getSelection();
				menu.style.display = 'flex';
				menu.style.top = `calc(${rect?.top}px - 45px)`;
				menu.style.left = `calc(${rect?.left}px + calc(${rect?.width}px / 2) - 40px)`;
			};
			const hide = () => {
				menu.style.display = 'none';
				mode = null;
			};
			const toggle = () => {
				const { active } = getSelection();
				if (mode) {
					return;
				}
				if (active) {
					show();
				} else {
					hide();
				}
			};
			on(node, 'pointerup', toggle);
			// deselect and hide toolbar on press
			on(document, 'pointerdown', () => {
				document.getSelection()?.removeAllRanges();
				hide();
			});
			// except when clicking the toolbar
			on(menu, 'pointerdown', (e) => {
				e.stopPropagation();
			});
			toolbar = {
				show,
				hide,
				toggle
			};
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
		get toolbar() {
			return toolbar;
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
