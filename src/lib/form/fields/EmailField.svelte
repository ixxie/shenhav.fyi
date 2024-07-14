<script lang="ts">
	import Field from './Field.svelte';

	let {
		label = 'Email',
		id = label.toLowerCase().replace(' ', '-'),
		required = false,
		value = $bindable(undefined)
	}: {
		label?: string
		id?: string
		required?: boolean
		value?: string
	} = $props()
</script>

<Field {label} {id} {required}>
	<input type="email" name={id} {required} bind:value />
</Field>
