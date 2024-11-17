<script lang="ts">
	import { registerRichText } from '@lexical/rich-text';

	import { onMount } from 'svelte';

	import { useEditor } from '../hook.svelte';

	const editor = useEditor();

	onMount(() => (editor.instance ? registerRichText(editor.instance) : null));
</script>
