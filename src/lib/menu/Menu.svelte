<script lang="ts">
	import { page } from '$app/stores';

	import { mobileMenuOpen } from './stores';

	import MenuDesktop from './MenuDesktop.svelte';
	import MenuMobile from './MenuMobile.svelte';

	const pages = ['websites', 'startups', 'experience', 'skills', 'contact'];
	$: active = $page.url.pathname.slice(1);
	const iconSize = 20;
</script>

{#if $mobileMenuOpen}
	<MenuMobile {pages} {active} {iconSize} />
{:else}
	<MenuDesktop {pages} {active} {iconSize} />
{/if}
