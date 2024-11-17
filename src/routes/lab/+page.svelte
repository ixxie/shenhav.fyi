<script lang="ts">
	import { Editor } from '$lib/editor';
	import {
		CorePlugin,
		LinkPlugin,
		DragonPlugin,
		HistoryPlugin,
		RichTextPlugin
	} from '$lib/editor/plugins';
</script>

<Editor debug>
	<CorePlugin />
	<RichTextPlugin />
	<HistoryPlugin />
	<DragonPlugin />
	<LinkPlugin />
</Editor>
