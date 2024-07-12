<script lang="ts">
	import { Close, Checkmark, Warning, Error } from '$lib/icons';

	import { fade } from 'svelte/transition';
	import type { SvelteComponent } from 'svelte';

	let {
		type = 'info',
		open = $bindable(true),
		title = '',
		message,
		ontoastclosed
	} = $props<{
		type: 'error' | 'warning' | 'info'
		open: boolean
		title: string
		message: string,
		ontoastclosed: () => void
	}>()

	const error = $derived(type == 'error');
	const warning = $derived(type == 'warning');
	const info = $derived(type == 'info');

	const icon: Record<'error' | 'warning' | 'info', SvelteComponent> = {
		error: Error,
		warning: Warning,
		info: Checkmark
	};

	function close() {
		open = false;
		ontoastclosed()
	}
</script>

{#if open}
	<section class:error class:warning class:info transition:fade={{ duration: 200 }}>
		<span>
			<svelte:component this={icon[type]} />
			<b>{title ? title + ':' : ''}</b>{message}
		</span>
		<span onclick={close} onkeypress={close} role="button" tabindex="0">
			<Close />
		</span>
	</section>
{/if}

<style>
	:root {
		--toast-opacity: 0.3;
	}

	section {
		flex-grow: 1;
		padding: 0.5em;
		margin: 0;
		display: flex;
		gap: 0.5em;
		flex-flow: row;
		align-items: center;
		justify-content: space-between;
	}

	span {
		display: flex;
		align-items: center;
		font-size: smaller;
		gap: 0.5em;
		text-overflow: ellipsis;
	}

	.error {
		background-color: rgb(192, 39, 85, var(--toast-opacity));
	}

	.warning {
		background-color: rgb(224, 194, 57, var(--toast-opacity));
	}

	.info {
		background-color: rgb(38, 99, 150, var(--toast-opacity));
	}
</style>
