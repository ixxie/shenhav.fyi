<script lang="ts">
	import { page } from '$app/stores';

	import { mobileMenu } from './state.svelte';
	import MenuDesktop from './MenuDesktop.svelte';
	import MenuMobile from './MenuMobile.svelte';

	const {
		pages
	} = $props<{
		pages: string[]
	}>();

	const active = $derived($page.url.pathname.slice(1));
</script>

{#if mobileMenu.open}
	<MenuMobile {pages} {active} />
{:else}
	<MenuDesktop {pages} {active} />
{/if}
