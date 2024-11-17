<script lang="ts">
	import { createEmptyHistoryState, registerHistory } from '@lexical/history';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	$effect(() => {
		editor.instance
			? registerHistory(editor.instance, createEmptyHistoryState(), 300)
			: null;
	});
</script>
