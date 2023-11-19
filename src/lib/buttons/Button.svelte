<script lang="ts">
	export let formaction: string | undefined = undefined;
</script>

<button on:click on:keypress on:keydown on:keyup {formaction}><slot /></button>

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
