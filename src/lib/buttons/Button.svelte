<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		children,
		formaction,
		onclick = () => {},
		onkeypress = () => {},
		onkeydown = () => {},
		onkeyup = () => {},
	}: {
		children: Snippet,
		formaction?: string,
		onclick?: () => void,
		onkeypress?: () => void,
		onkeydown?: () => void,
		onkeyup?: () => void,
	} = $props()
</script>

<button {onclick} {onkeypress} {onkeydown} {onkeyup} {formaction}>
	{@render children()}
</button>

<style>
	button {
		border: none;
		background-color: hsl(var(--color), 50%, 20%);
		color: var(--button-text-color, white);
		font-weight: bold;
		line-height: 30px;
		padding: 0.5em 2em 0.5em 2em;
	}
</style>
