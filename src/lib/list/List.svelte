<script lang="ts">
	export let items: string[];
</script>

<p class="list">
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
	}
</style>
