<script lang="ts">
	import { registerDragonSupport } from '@lexical/dragon';

	import { onMount } from 'svelte';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	onMount(() =>
		editor.instance ? registerDragonSupport(editor.instance) : null
	);
</script>
