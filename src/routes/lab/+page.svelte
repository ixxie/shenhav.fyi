<script lang="ts">
	import { Editor } from '$lib/editor';
	import {
		CorePlugin,
		LinkPlugin,
		DragonPlugin,
		HistoryPlugin,
		RichTextPlugin
	} from '$lib/editor/plugins';
	import { TypeTheme, LinkTheme, BasicToolTheme } from '$lib/editor/themes';
</script>

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

<style>
	:root {
		--sl-type-font-family: Vollkorn;
		--sl-link-color: orangered;
		--sl-link-decoration: underline 2px dotted orangered;
	}
</style>
