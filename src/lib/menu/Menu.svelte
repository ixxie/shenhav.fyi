<script lang="ts">
	import { page } from '$app/stores';

	import { mobileMenuOpen } from './stores';

	import MenuDesktop from './MenuDesktop.svelte';
	import MenuMobile from './MenuMobile.svelte';

	export let pages: string[];

	$: active = $page.url.pathname.slice(1);
	const iconSize = 32;
</script>

{#if $mobileMenuOpen}
	<MenuMobile {pages} {active} />
{:else}
	<MenuDesktop {pages} {active} />
{/if}
