import * as core from 'lexical';

import { on } from 'svelte/events';

import { theme } from './lib/theme';
import type { SvelteLexicalPlugin } from './types';

export class SvelteLexicalEditor {
	#instance: core.LexicalEditor | undefined = $state.raw();
	#toolbar: SvelteLexicalToolbar | undefined = $state();
	#plugins: SvelteLexicalPlugin[] = $state([]);
	#content: {} = $state.raw({});
	selection: SvelteLexicalSelection;
	log: boolean = false;

	public mode: string | null = $state(null);

	constructor({ log }: { log: boolean } = { log: false }) {
		this.log = log;
		$effect(() => {
			if (this.mode) {
				this.#instance?.setEditable(false);
			} else {
				this.#instance?.setEditable(true);
			}
		});
		// setup selection
		this.selection = new SvelteLexicalSelection();
	}

	init(node: HTMLElement) {
		// init instance
		this.console.info('creating editor instance');
		const options = {
			theme,
			editable: true,
			namespace: 'editor',
			nodes: this.nodes,
			onError: (error: Error) => {
				throw error;
			}
		};
		this.console.debug(options);
		this.#instance = core.createEditor(options);

		this.console.info('registering content change event listener');
		this.#instance.registerUpdateListener(({ editorState }) => {
			this.console.debug('updating content state', editorState);
			this.#content = editorState.toJSON();
		});

		// setup editable content
		const contentNode: HTMLElement | null = node.querySelector(
			'#svelte-lexical-content'
		);
		if (contentNode) {
			this.console.debug('registering content node', contentNode);
			contentNode.contentEditable = 'true';
			this.#instance.setRootElement(contentNode);
		}

		// setup toolbar
		const toolbarNode: HTMLElement | null = node.querySelector(
			'#svelte-lexical-toolbar'
		);
		if (toolbarNode) {
			this.console.debug('registering toolbar node', toolbarNode);
			this.#toolbar = new SvelteLexicalToolbar(this, toolbarNode);
		}
	}

	plugin(plugin: SvelteLexicalPlugin) {
		this.console.info(`registering plugin ${plugin.name}`);
		this.#plugins.push(plugin);
		if (plugin?.register) {
			$effect(() =>
				this.#instance && plugin.register
					? plugin.register(this.#instance)
					: () => {}
			);
		}
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

	get console() {
		const prefix = '[svelte-lexical]';
		return this.log
			? {
					debug: (...args: Parameters<typeof console.debug>) =>
						console.debug(prefix, ...args),
					info: (...args: Parameters<typeof console.info>) =>
						console.info(prefix, ...args),
					log: (...args: Parameters<typeof console.log>) =>
						console.log(prefix, ...args),
					warn: (...args: Parameters<typeof console.warn>) =>
						console.warn(prefix, ...args),
					error: (...args: Parameters<typeof console.error>) =>
						console.error(prefix, ...args)
				}
			: {
					debug: (..._: Parameters<typeof console.debug>) => {},
					info: (..._: Parameters<typeof console.info>) => {},
					log: (..._: Parameters<typeof console.log>) => {},
					warn: (..._: Parameters<typeof console.warn>) => {},
					error: (..._: Parameters<typeof console.error>) => {}
				};
	}
}

class SvelteLexicalToolbar {
	#editor: SvelteLexicalEditor;
	#node: HTMLElement;

	constructor(editor: SvelteLexicalEditor, toolbarNode: HTMLElement) {
		this.#editor = editor;
		this.#node = toolbarNode;

		if (!this.#editor.instance) {
			return;
		}

		this.#editor.console.info('initializing toolbar');

		const rootNode = this.#editor.instance.getRootElement();
		if (rootNode) {
			this.#editor.console.info(
				'registering root node listener for toolbar toggle'
			);
			on(rootNode, 'pointerup', () => {
				this.toggle();
			});
		}

		// deselect and hide toolbar on press
		this.#editor.console.info(
			'registering document node listener for toolbar clearing'
		);
		on(document, 'pointerdown', () => {
			document.getSelection()?.removeAllRanges();
			this.hide();
		});

		// except when clicking the toolbar
		this.#editor.console.info(
			'registering toolbar node listener to stop propagation'
		);
		on(toolbarNode, 'pointerdown', (e) => {
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
		if (this.#editor.mode) {
			return;
		}
		const { active } = this.#editor.selection;
		if (active) {
			this.show();
		} else {
			this.hide();
		}
	}
}

export class SvelteLexicalSelection {
	#rect: DOMRect | undefined = $state();
	#text: string | undefined = $state();
	#active: boolean = $state(false);

	constructor() {
		// listen to selection changes
		if (typeof window !== 'undefined') {
			on(document, 'selectionchange', () => {
				const selection = window?.getSelection();
				this.#rect =
					(selection?.rangeCount ?? 0) > 0
						? selection?.getRangeAt(0)?.getBoundingClientRect()
						: undefined;
				this.#text = selection?.toString();
				this.#active = !selection?.isCollapsed;
			});
		}
	}

	get rect() {
		return this.#rect;
	}
	get text() {
		return this.#text;
	}
	get active() {
		return this.#active;
	}
}
