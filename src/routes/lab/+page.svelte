<script lang="ts">
	import { Editor } from '$lib/editor/core';
	import {
		CorePlugin,
		LinkPlugin,
		DragonPlugin,
		HistoryPlugin,
		RichTextPlugin
	} from '$lib/editor/plugins';
	import { TypeTheme, LinkTheme, BasicToolTheme } from '$lib/editor/themes';
</script>

<main>
	<Editor debug>
		<!--plugins-->
		<CorePlugin />
		<RichTextPlugin />
		<HistoryPlugin />
		<DragonPlugin />
		<LinkPlugin />
		<!--themes-->
		<TypeTheme />
		<LinkTheme />
		<BasicToolTheme />
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
