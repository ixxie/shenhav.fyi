import * as lex_rich from '@lexical/rich-text';
import * as lex from 'lexical';

export function insertTestdata() {
	const root = lex.$getRoot();
	if (root.getFirstChild() !== null) {
		return;
	}

	const heading = lex_rich.$createHeadingNode('h1');
	heading.append(lex.$createTextNode('Welcome to the Vanilla JS Lexical Demo!'));
	root.append(heading);
	const quote = lex_rich.$createQuoteNode();
	quote.append(
		lex.$createTextNode(
			`In case you were wondering what the text area at the bottom is – it's the debug view, showing the current state of the editor. `
		)
	);
	root.append(quote);
	const paragraph = lex.$createParagraphNode();
	paragraph.append(
		lex.$createTextNode('This is a demo environment built with '),
		lex.$createTextNode('lexical').toggleFormat('code'),
		lex.$createTextNode('.'),
		lex.$createTextNode(' Try typing in '),
		lex.$createTextNode('some text').toggleFormat('bold'),
		lex.$createTextNode(' with '),
		lex.$createTextNode('different').toggleFormat('italic'),
		lex.$createTextNode(' formats.')
	);
	root.append(paragraph);
}
