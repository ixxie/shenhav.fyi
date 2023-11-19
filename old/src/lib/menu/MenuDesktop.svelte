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
	<Logo />
	<div>
		{#each pages as page}
			<a class:active={active == page} href="/{page}">{page}</a> <span>∙</span>
		{/each}
		<MenuSocial {iconSize} />
	</div>
	<button on:click={showMobileMenu}>
		<Menu size={iconSize} fill="hsl(var(--color), 50%, 20%)" />
	</button>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 2rem 0;
		padding: 0 1rem;
		opacity: 0.85;
		mix-blend-mode: multiply;
	}

	div {
		display: flex;
		gap: 0.5em;
		align-items: center;
		height: 40px;
	}

	div > a,
	span {
		text-transform: uppercase;
		line-height: 40px;
		display: flex;
		align-items: center;
		margin: auto;
	}

	nav :global(.logo) {
		font-size: 40px;
	}

	button {
		border: 0;
		padding: 0;
		background: none;
		display: none;
	}

	@media (max-width: 700px) {
		nav {
			margin: 1rem 0;
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
