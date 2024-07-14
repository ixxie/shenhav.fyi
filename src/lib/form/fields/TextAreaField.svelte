<script lang="ts">
	import Field from './Field.svelte';

	let {
		label,
		rows = 10,
		id = label.toLowerCase().replace(' ', '-'),
		required = false,
		value = $bindable(undefined)
	}: {
		label: string
		rows?: number
		id?: string
		required?: boolean
		value?: string
	} = $props()
</script>

<Field {label} {id} {required}>
	<textarea name={id} {rows} {required} bind:value></textarea>
</Field>
