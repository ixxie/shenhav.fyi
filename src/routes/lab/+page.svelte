<script lang="ts">
	import { Editor } from '$lib/editor/core';
	import {
		CoreModule,
		LinkModule,
		DragonModule,
		HistoryModule,
		RichTextModule,
		BasicToolModule
	} from '$lib/editor/modules';
</script>

<main>
	<Editor debug>
		<CoreModule />
		<RichTextModule />
		<HistoryModule />
		<DragonModule />
		<LinkModule />
		<BasicToolModule />
	</Editor>
</main>

<style>
	:root {
		--sl-type-font-family: Vollkorn;
		--sl-link-color: orangered;
		--sl-link-decoration: underline 2px dotted orangered;
	}

	main {
		margin-top: 3rem;
		max-width: 60ch;
	}
</style>
