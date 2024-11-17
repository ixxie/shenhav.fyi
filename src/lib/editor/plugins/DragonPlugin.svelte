<script lang="ts">
	import { registerDragonSupport } from '@lexical/dragon';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	$effect(() =>
		editor.instance ? registerDragonSupport(editor.instance) : () => null
	);
</script>
