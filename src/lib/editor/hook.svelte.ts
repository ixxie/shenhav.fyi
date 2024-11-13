import { registerDragonSupport } from '@lexical/dragon';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import {
	createEditor,
	FORMAT_TEXT_COMMAND,
	type TextFormatType,
	type CreateEditorArgs
} from 'lexical';

import { insertTestdata } from './testdata';

export function useEditor(
	config: CreateEditorArgs = {
		editable: true,
		namespace: 'editor',
		nodes: [HeadingNode, QuoteNode],
		onError: (error: Error) => {
			throw error;
		}
	}
) {
	// init

	if (typeof window === 'undefined')
		return {
			instance: null,
			pad: () => {},
			state: null,
			format: (_: TextFormatType) => {},
			update: () => {}
		};

	const instance = createEditor(config);

	// plugins

	mergeRegister(
		registerRichText(instance),
		registerDragonSupport(instance),
		registerHistory(instance, createEmptyHistoryState(), 300)
	);

	instance.update(insertTestdata, { tag: 'history-merge' });

	// state
	let state = $state();
	let selection = $state();

	instance.registerUpdateListener(({ editorState }) => {
		state = editorState.toJSON();
		selection = editorState._selection;
	});

	// events

	function sel() {
		console.log(selection);
		const s = window.getSelection();
		let rect = (s?.rangeCount ?? 0) > 0 ? s?.getRangeAt(0)?.getBoundingClientRect() : null;
		const text = s?.toString();
		const active = !s?.isCollapsed;
		return {
			rect,
			text,
			active
		};
	}

	function pad(node: HTMLElement) {
		const toolbar = node.querySelector('menu');
		const article = node.querySelector('article');
		if (article) {
			// setup editable content
			article.contentEditable = 'true';
			instance.setRootElement(article);
		}
		if (toolbar) {
			// setup toolbar
			node.addEventListener('pointerup', () => {
				const { active, rect } = sel();
				if (active) {
					toolbar.style.display = 'flex';
					toolbar.style.top = `calc(${rect?.top}px - 45px)`;
					toolbar.style.left = `calc(${rect?.left}px + calc(${rect?.width}px / 2) - 40px)`;
				} else {
					toolbar.style.display = 'none';
				}
			});

			toolbar.addEventListener('pointerdown', (e) => {
				e.stopPropagation();
			});

			document.addEventListener('pointerdown', () => {
				document.getSelection()?.removeAllRanges();
				toolbar.style.display = 'none';
			});
		}
	}

	return {
		instance,
		pad,
		get state() {
			return state;
		},
		get selection() {
			return selection;
		},
		format: (style: TextFormatType) => instance?.dispatchCommand(FORMAT_TEXT_COMMAND, style),
		update: instance.update
	};
}
