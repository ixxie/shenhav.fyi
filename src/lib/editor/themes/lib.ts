import * as core from 'lexical';

export const buildClasses = (
	prefix: string,
	depth: number = 10
): core.EditorThemeClasses => ({
	blockCursor: `${prefix}-block-cursor`,
	characterLimit: `${prefix}-character-limit`,
	code: `${prefix}-code`,
	codeHighlight: {
		atrule: `${prefix}-code-highlight-atrule`,
		attr: `${prefix}-code-highlight-attr`,
		boolean: `${prefix}-code-highlight-boolean`,
		builtin: `${prefix}-code-highlight-builtin`,
		cdata: `${prefix}-code-highlight-cdata`,
		char: `${prefix}-code-highlight-char`,
		class: `${prefix}-code-highlight-class`,
		'class-name': `${prefix}-code-highlight-class-name`,
		comment: `${prefix}-code-highlight-comment`,
		constant: `${prefix}-code-highlight-constant`,
		deleted: `${prefix}-code-highlight-deleted`,
		doctype: `${prefix}-code-highlight-doctype`,
		entity: `${prefix}-code-highlight-entity`,
		function: `${prefix}-code-highlight-function`,
		important: `${prefix}-code-highlight-important`,
		inserted: `${prefix}-code-highlight-inserted`,
		keyword: `${prefix}-code-highlight-keyword`,
		namespace: `${prefix}-code-highlight-namespace`,
		number: `${prefix}-code-highlight-number`,
		operator: `${prefix}-code-highlight-operator`,
		prolog: `${prefix}-code-highlight-prolog`,
		property: `${prefix}-code-highlight-property`,
		punctuation: `${prefix}-code-highlight-punctuation`,
		regex: `${prefix}-code-highlight-regex`,
		selector: `${prefix}-code-highlight-selector`,
		string: `${prefix}-code-highlight-string`,
		symbol: `${prefix}-code-highlight-symbol`,
		tag: `${prefix}-code-highlight-tag`,
		url: `${prefix}-code-highlight-url`,
		variable: `${prefix}-code-highlight-variable`
	},
	hashtag: `${prefix}-hashtag`,
	heading: {
		h1: `${prefix}-heading-h1`,
		h2: `${prefix}-heading-h2`,
		h3: `${prefix}-heading-h3`,
		h4: `${prefix}-heading-h4`,
		h5: `${prefix}-heading-h5`,
		h6: `${prefix}-heading-h6`
	},
	hr: `${prefix}-hr`,
	image: `${prefix}-image`,
	link: `${prefix}-link`,
	list: {
		ul: `${prefix}-list-ul`,
		ulDepth: seq(depth).map((i) => `${prefix}-list-ul-depth-${i}`),
		ol: `${prefix}-list-ol`,
		olDepth: seq(depth).map((i) => `${prefix}-list-ol-depth-${i}`),
		checklist: `${prefix}-list-checklist`,
		listitem: `${prefix}-list-listitem`,
		listitemChecked: `${prefix}-list-listitem-checked`,
		listitemUnchecked: `${prefix}-list-listitem-unchecked`,
		nested: {
			list: `${prefix}-list-nested-list`,
			listitem: `${prefix}-list-nested-listitem`
		}
	},
	ltr: `${prefix}-ltr`,
	mark: `${prefix}-mark`,
	markOverlap: `${prefix}-mark-overlap`,
	paragraph: `${prefix}-paragraph`,
	quote: `${prefix}-quote`,
	root: `${prefix}-root`,
	rtl: `${prefix}-rtl`,
	table: `${prefix}-table`,
	tableAddColumns: `${prefix}-table-add-columns`,
	tableAddRows: `${prefix}-table-add-rows`,
	tableCellActionButton: `${prefix}-table-cell-action-button`,
	tableCellActionButtonContainer: `${prefix}-table-cell-action-button-container`,
	tableCellSelected: `${prefix}-table-cell-selected`,
	tableCell: `${prefix}-table-cell`,
	tableCellHeader: `${prefix}-table-cell-header`,
	tableCellResizer: `${prefix}-table-cell-resizer`,
	tableRow: `${prefix}-table-row`,
	tableScrollableWrapper: `${prefix}-table-scrollable-wrapper`,
	tableSelected: `${prefix}-table-selected`,
	tableSelection: `${prefix}-table-selection`,
	text: {
		base: `${prefix}-text-base`,
		bold: `${prefix}-text-bold`,
		code: `${prefix}-text-code`,
		highlight: `${prefix}-text-highlight`,
		italic: `${prefix}-text-italic`,
		strikethrough: `${prefix}-text-strikethrough`,
		subscript: `${prefix}-text-subscript`,
		superscript: `${prefix}-text-superscript`,
		underline: `${prefix}-text-underline`,
		underlineStrikethrough: `${prefix}-text-underline-strikethrough`
	},
	embedBlock: {
		base: `${prefix}-embed-block-base`,
		focus: `${prefix}-embed-block-focus`
	},
	indent: `${prefix}-indent`
});

function seq(n: number) {
	return Array(n)
		.fill(1)
		.map((_, i) => i + 1);
}
