// lexical core
import { createEditor } from 'lexical';
import { mergeRegister } from '@lexical/utils';

// lexical plugins
import { registerDragonSupport } from '@lexical/dragon';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerRichText } from '@lexical/rich-text';

// custom
import { insertTestdata } from './lib/testdata';
import { theme } from './lib/theme';

export interface InitEditorConfig {
	testdata: boolean;
}

export function initEditor(
	{ testdata }: InitEditorConfig = {
		testdata: false
	}
) {
	const instance = createEditor({
		theme,
		editable: true,
		namespace: 'editor',
		onError: (error: Error) => {
			throw error;
		}
	});

	// plugins

	mergeRegister(
		registerRichText(instance),
		registerDragonSupport(instance),
		registerHistory(instance, createEmptyHistoryState(), 300)
	);

	if (testdata) {
		instance.update(insertTestdata, { tag: 'history-merge' });
	}

	return instance;
}
