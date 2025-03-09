<script lang="ts">
	import {
		CoreModule,
		LinkModule,
		DragonModule,
		HistoryModule,
		RichTextModule
	} from '$lib/editor/modules';

	import './lib/icons.css';
</script>

<CoreModule />
<RichTextModule />
<HistoryModule />
<DragonModule />
<LinkModule />

<style>
	:root {
		--sl-type-font-family: Vollkorn;
		--sl-link-color: orangered;
		--sl-link-decoration: underline 2px dotted orangered;
	}
</style>
