<script lang="ts">
	import { enhance } from '$app/forms';

	import { Button } from '$lib/buttons';
	import { Toast } from '$lib/toast';
	import type { Snippet } from 'svelte';

	import { Fieldset } from './fields';

	const {
		children,
		action,
		submitButton = 'submit',
		method = 'post',
		id = action
	}: {
		children: Snippet,
		action: string;
		submitButton?: string
		method?: 'post' | 'get'
		id?: string
	} = $props()

	let open = $state(false)

	let type: 'error' | 'info' = $state('info');
	let title: string = $state('');
	let message: string = $state('');
</script>

<form
	{id}
	{method}
	action="?/{action}"
	use:enhance={() => {
		return async ({ result, update }) => {
			open = true;
			if (result.type != 'redirect' && result.type != 'error') {
				type = result.type == 'success' ? 'info' : 'error';
				title = `${result?.data?.title}`;
				message = `${result?.data?.message}`;
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
	{@render children()}
	<Fieldset align="right">
		<Button formaction="?/{action}">{submitButton}</Button>
		<Toast bind:open {type} {title} {message} />
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
