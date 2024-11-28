<script lang="ts">
	import { useEditor } from '..';

	const editor = useEditor();

	editor.theme({
		name: 'link',
		classes: {
			link: 'link-theme link'
		}
	});
</script>

<style>
	:global {
		.svelte-lexical .link-theme {
			&.link {
				color: var(--sl-link-color, deepskyblue);
				text-decoration: var(
					--sl-link-decoration,
					underline solid 2px var(--sl-link-color, deepskyblue)
				);
			}
		}
	}
</style>
