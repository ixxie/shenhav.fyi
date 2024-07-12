<script lang="ts">
	const {
		items,
		small = false
	} = $props<{
		items: string[],
		small?: boolean
	}>()
</script>

<p class="list" class:small>
	{#each items as item, i}
		{@const last = i == items?.length - 1}
		<span>{item}</span>{#if !last}<span>∙</span>{/if}
	{/each}
</p>

<style>
	.list {
		font-weight: 500;
		text-transform: uppercase;
		display: flex;
		flex-flow: row wrap;
		gap: 0.5rem;
		color: hsl(var(--color), 50%, 20%);
		margin-top: 1rem;
		line-height: 1.2rem;
	}

	.small {
		font-size: smaller;
		gap: 0.2rem;
	}
</style>
