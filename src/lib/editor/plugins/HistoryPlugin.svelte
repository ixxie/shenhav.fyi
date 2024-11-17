<script lang="ts">
	import { createEmptyHistoryState, registerHistory } from '@lexical/history';

	import { onMount } from 'svelte';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	onMount(() =>
		editor.instance
			? registerHistory(editor.instance, createEmptyHistoryState(), 300)
			: null
	);
</script>
