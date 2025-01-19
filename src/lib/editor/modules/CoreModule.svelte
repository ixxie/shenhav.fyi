<script lang="ts">
	import { useEditor } from '../core';
	import { Tool } from './lib';

	const editor = useEditor();

	editor.plugin({ name: 'core', tools: [styleTool] });

	editor.theme({
		name: 'type',
		classes: {
			text: {
				base: 'type-theme base',
				bold: 'type-theme bold',
				code: 'type-theme code',
				highlight: 'type-theme highlight',
				italic: 'type-theme italic',
				strikethrough: 'type-theme strikethrough',
				subscript: 'type-theme subscript',
				superscript: 'type-theme superscript',
				underline: 'type-theme underline',
				underlineStrikethrough: 'type-theme underline-strikethrough'
			}
		}
	});
</script>

{#snippet styleTool()}
	{#if !editor.mode}
		<Tool
			name="Bold"
			onclick={() => editor.format('bold')}
			--sl-icon="var(--sl-bold-icon, var(--sl-default-bold-icon))"
		/>
		<Tool
			name="Italic"
			onclick={() => editor.format('italic')}
			--sl-icon="var(--sl-italic-icon, var(--sl-default-italic-icon))"
		/>
	{/if}
	<style>
		:root {
			--sl-default-bold-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xODUuMDgsMTE0LjQ2QTQ4LDQ4LDAsMCwwLDE0OCwzNkg4MEExMiwxMiwwLDAsMCw2OCw0OFYyMDBhMTIsMTIsMCwwLDAsMTIsMTJoODBhNTIsNTIsMCwwLDAsMjUuMDgtOTcuNTRaTTkyLDYwaDU2YTI0LDI0LDAsMCwxLDAsNDhIOTJabTY4LDEyOEg5MlYxMzJoNjhhMjgsMjgsMCwwLDEsMCw1NloiPjwvcGF0aD48L3N2Zz4=');
			--sl-default-italic-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMDQsNTZhMTIsMTIsMCwwLDEtMTIsMTJIMTYwLjY1bC00MCwxMjBIMTQ0YTEyLDEyLDAsMCwxLDAsMjRINjRhMTIsMTIsMCwwLDEsMC0yNEg5NS4zNWw0MC0xMjBIMTEyYTEyLDEyLDAsMCwxLDAtMjRoODBBMTIsMTIsMCwwLDEsMjA0LDU2WiI+PC9wYXRoPjwvc3ZnPg==');
		}
	</style>
{/snippet}

<style>
	:global {
		.svelte-lexical .type-theme {
			&.base {
				font-family: var(--sl-type-font-family, inherit);
				color: inherit;
			}
			&.bold {
				font-weight: bold;
			}
			&.code {
				font-family: var(--sl-type-monospace, monospace);
			}
			&.highlight {
				display: inline-block;
				padding: 0.25em 0;
				background: var(--sl-type-highlight-color, orangered);
			}
			&.italic {
				font-style: italic;
			}
			&.strikethrough {
				text-decoration: line-through;
			}
			&.subscript {
				font-size: var(--sl-type-subscript-size, 0.7em);
				vertical-align: sub;
			}
			&.superscript {
				font-size: var(--sl-type-superscript-size, 0.7em);
				vertical-align: super;
			}
			&.underline {
				text-decoration: underline;
			}
			&.underline-strikethrough {
				text-decoration: line-through underline;
			}
		}
	}
</style>
