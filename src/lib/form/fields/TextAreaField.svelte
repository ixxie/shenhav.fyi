<script lang="ts">
	import Field from './Field.svelte';

	let {
		label,
		rows = 10,
		id = label.toLowerCase().replace(' ', '-'),
		required = false,
		value = $bindable(undefined)
	} = $props<{
		label: string
		rows?: number
		id?: string
		required?: boolean
		value?: string
	}>()
</script>

<Field {label} {id} {required}>
	<textarea name={id} {rows} {required} bind:value></textarea>
</Field>
