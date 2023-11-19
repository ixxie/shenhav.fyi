<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	import { enhance } from '$app/forms';

	import { Button } from '$lib/buttons';
	import { Toast } from '$lib/toast';

	import { Fieldset } from './fields';

	export let action: string;
	export let submitButton: string = 'submit';
	export let method: 'post' | 'get' = 'post';
	export let id: string = action;

	let toast:
		| {
				type: 'error' | 'info';
				title: string;
				message: string;
		  }
		| undefined = undefined;

	let open: Writable<boolean> = writable(false);

	let type: 'error' | 'info' = 'info';
	let title: string = '';
	let message: string = '';
</script>

<form
	{id}
	{method}
	action="?/{action}"
	use:enhance={() => {
		return async ({ result, update }) => {
			$open = true;
			if (result.type != 'redirect' && result.type != 'error') {
				type = result.type == 'success' ? 'info' : 'error';
				title = result?.data?.title;
				message = result?.data?.message;
			} else {
				type = 'error';
				title = 'Unknown Error';
				message =
					'Looks like we have a bug in our site, please try again later or send us an email.';
			}
			update({ reset: result?.type == 'success' });
		};
	}}
>
	<slot />
	<Fieldset align="right">
		<Button formaction="?/{action}">{submitButton}</Button>
		<Toast bind:open={$open} {type} {title} {message} />
	</Fieldset>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0;
		z-index: 100;
		margin: 2em 0;
	}
</style>
