<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		children,
		label = 'Email',
		id = label.toLowerCase().replace(' ', '-'),
		required = false
	} = $props<{
		children: Snippet
		label?: string
		id?: string
		required?: boolean
	}>()
</script>

<div>
	<label for={id}>
		{label}
		{#if required}
			<span>*</span>
		{/if}
	</label>
	{@render children()}
</div>

<style>
	div {
		background-color: white;
		opacity: 0.85;
		flex-grow: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5em;
		padding: 0.5em;
	}
	div:focus-within {
		outline: 2px solid hsl(var(--color), 50%, 50%);
	}

	div :global(*) {
		color: var(--hex-neutral-dark);
	}
	div :global(input) {
		background-color: transparent;
		border: none;
		width: 100%;
		line-height: 30px;
	}
	div :global(textarea) {
		background-color: transparent;
		border: none;
	}
	div :global(*:focus-within) {
		border: none;
		outline-style: none;
	}

	span {
		color: var(--highlight-color, var(--hex-primary));
	}

	label {
		font-size: smaller;
	}
</style>
