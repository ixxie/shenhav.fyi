<script lang="ts">
	import { Toolbar, Tool } from './lib';

	const { cmds }: { cmds: { [key: string]: Function } } = $props();
</script>

<Toolbar>
	<Tool
		name="bold"
		onclick={() => cmds.format('bold')}
		--sl-icon="var(--sl-bold-icon)"
	/>
	<Tool
		name="italic"
		onclick={() => cmds.format('italic')}
		--sl-icon="var(--sl-italic-icon)"
	/>
</Toolbar>
