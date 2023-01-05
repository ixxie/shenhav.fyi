<script lang="ts">
	import Menu from 'carbon-icons-svelte/lib/Menu.svelte';

	import { mobileMenuOpen } from './stores';
	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	export let pages: string[];
	export let active: string;
	export let iconSize: 20 | 16 | 24 | 32 | undefined;

	const showMobileMenu = () => ($mobileMenuOpen = true);
</script>

<nav>
	<Logo {active} />
	<div>
		{#each pages as page}
			<a class:active={active == page} href="/{page}">{page}</a> <span>∙</span>
		{/each}
		<MenuSocial {iconSize} />
	</div>
	<button on:click={showMobileMenu}>
		<Menu size={iconSize} />
	</button>
</nav>

<style>
	nav {
		display: flex;
		justify-items: center;
		justify-content: space-between;
		gap: 0.5em;
		margin: 1em 0em 3em 0em;
	}

	div {
		display: flex;
		gap: 0.5em;
		align-items: center;
		height: 40px;
		overflow-x: hidden;
	}

	div > a,
	span {
		font-size: 19px;
		line-height: 40px;
		display: flex;
		align-items: center;
		margin: auto;
	}

	button {
		border: 0;
		padding: 0;
		background: none;
		display: none;
	}

	@media screen and (max-width: 700px) {
		nav {
			margin: 0;
		}

		div {
			display: none;
		}

		button {
			display: block;
			float: right;
		}
	}
</style>
