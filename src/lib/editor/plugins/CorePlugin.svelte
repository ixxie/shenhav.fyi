<script lang="ts">
	import { useEditor } from '../core';
	import { Tool } from './lib';

	const editor = useEditor();

	editor.plugin({ name: 'core', tools: [styleTool] });
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
