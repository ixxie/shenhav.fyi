<script lang="ts">
	import { registerRichText } from '@lexical/rich-text';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	$effect(() =>
		editor.instance ? registerRichText(editor.instance) : () => null
	);
</script>
