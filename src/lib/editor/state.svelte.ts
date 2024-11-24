import * as core from 'lexical';

import { on } from 'svelte/events';

import { theme } from './lib/theme';

import type { SvelteLexicalPlugin } from './types';

export class SvelteLexicalEditor {
	#instance: core.LexicalEditor | undefined = $state.raw();
	#content: {} = $state.raw({});
	#toolbar: SvelteLexicalToolbar | undefined = $state();
	#plugins: SvelteLexicalPlugin[] = $state([]);

	public mode: string | null = $state(null);

	constructor() {
		$effect(() => {
			if (this.mode) {
				this.#instance?.setEditable(false);
			} else {
				this.#instance?.setEditable(true);
			}
		});
	}

	init(node: HTMLElement) {
		// init instance

		this.#instance = core.createEditor({
			theme,
			editable: true,
			namespace: 'editor',
			nodes: this.nodes,
			onError: (error: Error) => {
				throw error;
			}
		});
		this.#instance.registerUpdateListener(({ editorState }) => {
			this.#content = editorState.toJSON();
		});

		// listen to selection changes

		// on(document, 'selectionchange', () => {
		// 	const selection = window?.getSelection();
		// 	// this.#selecting = selection !== null && !selection.isCollapsed;
		// });

		// setup editable content

		const article = node.querySelector('article');
		if (article) {
			article.contentEditable = 'true';
			this.#instance.setRootElement(article);
		}

		// setup toolbar

		const menu = node.querySelector('menu');
		if (menu) {
			this.#toolbar = new SvelteLexicalToolbar(this, menu);
		}
	}

	plugin(plugin: SvelteLexicalPlugin) {
		console.info(`Registering plugin ${plugin.name}`);
		this.#plugins.push(plugin);
	}

	format(style: core.TextFormatType) {
		return this.#instance?.dispatchCommand(core.FORMAT_TEXT_COMMAND, style);
	}

	update() {
		return this.#instance?.update ?? (() => {});
	}

	get instance() {
		return this.#instance;
	}

	get content() {
		return this.#content;
	}

	get toolbar() {
		return this.#toolbar;
	}

	get tools() {
		return this.#plugins.map(({ tools }) => tools ?? []).flat();
	}

	get nodes() {
		return this.#plugins.map(({ nodes }) => nodes ?? []).flat();
	}

	get selection() {
		const instance = window?.getSelection();
		let rect =
			(instance?.rangeCount ?? 0) > 0
				? instance?.getRangeAt(0)?.getBoundingClientRect()
				: null;
		const text = instance?.toString();
		const active = !instance?.isCollapsed;
		return {
			rect,
			text,
			active
		};
	}
}

class SvelteLexicalToolbar {
	#editor: SvelteLexicalEditor;
	#node: HTMLElement;

	constructor(editor: SvelteLexicalEditor, node: HTMLElement) {
		this.#editor = editor;
		this.#node = node;

		if (!this.#editor.instance) {
			return;
		}

		const root = this.#editor.instance.getRootElement();
		if (root) {
			on(root, 'pointerup', () => {
				this.toggle();
			});
		}

		// deselect and hide toolbar on press
		on(document, 'pointerdown', () => {
			document.getSelection()?.removeAllRanges();
			this.hide();
		});

		// except when clicking the toolbar
		on(node, 'pointerdown', (e) => {
			e.stopPropagation();
		});
	}

	show() {
		const { rect } = this.#editor.selection;
		this.#node.style.display = 'flex';
		this.#node.style.top = `calc(${rect?.top}px - 45px)`;
		this.#node.style.left = `calc(${rect?.left}px + calc(${rect?.width}px / 2) - 40px)`;
	}

	hide() {
		this.#node.style.display = 'none';
		this.#editor.mode = null;
	}

	toggle() {
		const { active } = this.#editor.selection;
		if (this.#editor.mode) {
			return;
		}
		if (active) {
			this.show();
		} else {
			this.hide();
		}
	}
}
