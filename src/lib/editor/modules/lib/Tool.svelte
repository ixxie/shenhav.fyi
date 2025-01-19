<script lang="ts">
	import type { Tool } from './types';

	const { name, onclick }: Tool = $props();
</script>

<button class="sl-tool" {onclick} aria-label={name}>
	<div class="sl-icon" style="var(--sl-icon)"></div>
</button>
