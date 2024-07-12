<script lang="ts">
	import Field from './Field.svelte';

	let {
		label,
		id = label.toLowerCase().replace(' ', '-'),
		required = false,
		value = $bindable(undefined)
	} = $props<{
		label: string
		id?: string
		required?: boolean
		value?: string
	}>()
</script>

<Field {label} {id} {required}>
	<input type="number" name={id} {required} bind:value />
</Field>